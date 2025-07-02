import { zValidator } from '@hono/zod-validator'
import { and, desc, eq, ilike } from 'drizzle-orm'
import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/zod'
import { ulid } from 'ulid'
import { z } from 'zod'
import { NOTE_AVAILABLE_COLORS } from '@/constants/note-available-colors'
import { db } from '@/db/connection'
import { notes as _notes } from '@/db/schema'
import { auth, type MiddlewareVariables } from '@/middlewares/auth'

const notes = new Hono<{ Variables: MiddlewareVariables }>()
  .use('/notes/*', auth)
  .get(
    '/notes',
    describeRoute({
      summary: 'List notes',
      operationId: 'list_notes',
      tags: ['notes'],
      responses: {
        200: {
          description: 'Successful Response',
          content: {
            'application/json': {
              schema: resolver(
                z.object({
                  notes: z.array(
                    z.object({
                      id: z.string(),
                      title: z.string(),
                      description: z.string(),
                      color: z.enum(NOTE_AVAILABLE_COLORS),
                      favorite: z.boolean(),
                    }),
                  ),
                }),
              ),
            },
          },
        },
      },
    }),
    zValidator(
      'query',
      z.object({
        search: z.string().optional(),
        color: z.enum(NOTE_AVAILABLE_COLORS).optional(),
        favorite: z
          .enum(['true', 'false'])
          .transform((f) => f === 'true')
          .optional(),
      }),
    ),
    async (c) => {
      const { search, color, favorite } = c.req.valid('query')
      const { user } = c.var

      const notes = await db
        .select({
          id: _notes.id,
          title: _notes.title,
          description: _notes.description,
          color: _notes.color,
          favorite: _notes.favorite,
        })
        .from(_notes)
        .where(
          and(
            eq(_notes.user_id, user),
            search ? ilike(_notes.title, '%' + search + '%') : undefined,
            color ? eq(_notes.color, color) : undefined,
            favorite !== undefined ? eq(_notes.favorite, favorite) : undefined,
          ),
        )
        .orderBy(desc(_notes.id))

      return c.json({ notes })
    },
  )
  .post(
    '/notes',
    describeRoute({
      summary: 'Create note',
      operationId: 'create_note',
      tags: ['notes'],
      responses: {
        201: {
          description: 'Successful Response',
          content: {
            'application/json': {
              schema: resolver(z.object({ id: z.string().ulid() })),
            },
          },
        },
      },
    }),
    zValidator(
      'json',
      z.object({
        title: z.string(),
        description: z.string(),
        favorite: z.boolean(),
      }),
    ),
    async (c) => {
      const { title, description, favorite } = c.req.valid('json')
      const { user } = c.var

      const id = ulid()

      await db.insert(_notes).values({
        id,
        user_id: user,
        title,
        description,
        favorite,
      })

      return c.json({ id }, 201)
    },
  )
  .patch(
    '/notes/:id',
    describeRoute({
      summary: 'Edit note',
      operationId: 'edit_note',
      tags: ['notes'],
      responses: {
        204: { description: 'Successful Response' },
        404: {
          description: '404 Response',
          content: {
            'application/json': {
              schema: resolver(
                z.object({ error: z.literal('note_not_found') }),
              ),
            },
          },
        },
      },
    }),
    zValidator('param', z.object({ id: z.string().ulid() })),
    zValidator(
      'json',
      z
        .object({
          title: z.string(),
          description: z.string(),
          color: z.enum(NOTE_AVAILABLE_COLORS),
          favorite: z.boolean(),
        })
        .partial(),
    ),
    async (c) => {
      const { id } = c.req.valid('param')
      const { title, description, color, favorite } = c.req.valid('json')
      const { user } = c.var

      const [note] = await db
        .select()
        .from(_notes)
        .where(and(eq(_notes.id, id), eq(_notes.user_id, user)))

      if (!note) {
        return c.json({ error: 'note_not_found' }, 404)
      }

      await db
        .update(_notes)
        .set({ title, description, color, favorite })
        .where(eq(_notes.id, id))

      return c.body(null, 204)
    },
  )
  .delete(
    '/notes/:id',
    describeRoute({
      summary: 'Delete note',
      operationId: 'delete_note',
      tags: ['notes'],
      responses: {
        204: { description: 'Successful Response' },
        404: {
          description: '404 Response',
          content: {
            'application/json': {
              schema: resolver(
                z.object({ error: z.literal('note_not_found') }),
              ),
            },
          },
        },
      },
    }),
    zValidator('param', z.object({ id: z.string().ulid() })),
    async (c) => {
      const { id } = c.req.valid('param')
      const { user } = c.var

      const [note] = await db
        .select()
        .from(_notes)
        .where(and(eq(_notes.id, id), eq(_notes.user_id, user)))

      if (!note) {
        return c.json({ error: 'note_not_found' }, 404)
      }

      await db.delete(_notes).where(eq(_notes.id, id))

      return c.body(null, 204)
    },
  )

export { notes }
