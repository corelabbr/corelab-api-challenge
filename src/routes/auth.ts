import { zValidator } from '@hono/zod-validator'
import { addMinutes, isFuture } from 'date-fns'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'
import { describeRoute } from 'hono-openapi'
import { ulid } from 'ulid'
import { z } from 'zod'
import { config } from '@/config'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/constants/access-token-cookie-name'
import { ACCESS_TOKEN_LIFETIME } from '@/constants/access-token-lifetime'
import { db } from '@/db/connection'
import { one_time_tokens, users } from '@/db/schema'
import { resend } from '@/lib/resend'

const auth = new Hono()
  .post(
    '/auth/links',
    describeRoute({
      summary: 'Request magic link',
      operationId: 'request_magic_link',
      tags: ['auth'],
      responses: {
        204: { description: 'Successful Response' },
      },
    }),
    zValidator(
      'json',
      z.object({
        email: z.string().email(),
      }),
    ),
    async (c) => {
      const { email } = c.req.valid('json')

      const id = ulid()

      await db.insert(one_time_tokens).values({
        id,
        email,
        expires_at: addMinutes(new Date(), 5),
      })

      const link = new URL('/auth/links/' + id, config.BASE_URL)

      await resend.emails.send({
        from: 'Corenotes <corenotes@dcdms.me>',
        to: [email],
        subject: 'Login to Corenotes',
        html: 'Your link is ' + link.href,
      })

      return c.body(null, 204)
    },
  )
  .get(
    '/auth/links/:id',
    describeRoute({
      summary: 'Login from magic link',
      operationId: 'login_from_magic_link',
      tags: ['auth'],
    }),
    zValidator('param', z.object({ id: z.string().ulid() })),
    async (c) => {
      const { id } = c.req.valid('param')

      const [token] = await db
        .select({
          email: one_time_tokens.email,
          expires_at: one_time_tokens.expires_at,
          was_used: one_time_tokens.was_used,
        })
        .from(one_time_tokens)
        .where(eq(one_time_tokens.id, id))

      if (!token || !isFuture(token.expires_at) || token.was_used) {
        return c.json({ error: 'unauthorized' }, 401)
      }

      await db
        .update(one_time_tokens)
        .set({ was_used: true })
        .where(eq(one_time_tokens.id, id))

      const [user] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, token.email))

      let sub = user?.id

      if (!sub) {
        const id = ulid()
        await db.insert(users).values({ id, email: token.email })

        sub = id
      }

      const accessToken = await sign(
        { sub, exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_LIFETIME },
        config.JWT_SECRET,
      )

      setCookie(c, ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        httpOnly: true,
        maxAge: ACCESS_TOKEN_LIFETIME,
      })

      return c.redirect(config.WEBSITE_BASE_URL)
    },
  )
  .delete(
    '/logout',
    describeRoute({
      summary: 'Logout',
      operationId: 'logout',
      tags: ['auth'],
      responses: {
        204: { description: 'Successful Response' },
      },
    }),
    (c) => {
      deleteCookie(c, ACCESS_TOKEN_COOKIE_NAME)
      return c.body(null, 204)
    },
  )

export { auth }
