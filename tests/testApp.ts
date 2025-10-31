import { Ignitor } from '@adonisjs/core/build/standalone'

export async function getAppCallback() {
  const ignitor = new Ignitor(__dirname + '/..')
  const httpServer = await ignitor.httpServer().start()
  return httpServer.handle.bind(httpServer)
}