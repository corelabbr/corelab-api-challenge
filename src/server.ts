import { serve } from '@hono/node-server'
import { Scalar } from '@scalar/hono-api-reference'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { openAPISpecs } from 'hono-openapi'
import { config } from '@/config'
import { auth } from '@/routes/auth'
import { notes } from '@/routes/notes'

const app = new Hono()
  .use(
    '*',
    cors({
      origin: config.WEBSITE_BASE_URL,
      allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      credentials: true,
    }),
  )
  .route('/', auth)
  .route('/', notes)

app.get('/reference', Scalar({ url: '/docs', theme: 'elysiajs' }))

app.get(
  '/docs',
  openAPISpecs(app, {
    documentation: {
      info: {
        title: 'Corenotes REST API',
        description:
          'Modern Hono-based API with passwordless authentication and notes management.',
        version: '1.0.0',
      },
    },
  }),
)

serve(
  {
    fetch: app.fetch,
    port: config.PORT,
  },
  (info) => {
    console.log('server is running on http://localhost:' + info.port)
  },
)

export type AppType = typeof app
