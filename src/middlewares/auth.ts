import { getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
import { config } from '@/config'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/constants/access-token-cookie-name'

export type MiddlewareVariables = { user: string }

export const auth = createMiddleware(async (c, next) => {
  const token =
    c.req.header('Authorization')?.replace('Bearer ', '') ??
    getCookie(c, ACCESS_TOKEN_COOKIE_NAME)

  if (!token) {
    return c.json({ error: 'unauthorized' }, 401)
  }

  try {
    const decoded = await verify(token, config.JWT_SECRET)
    const sub = decoded.sub as string

    c.set('user', sub)
    await next()
  } catch {
    return c.json({ error: 'unauthorized' }, 401)
  }
})
