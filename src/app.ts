import dotenv from 'dotenv'
import { HttpServer } from './config/http-server'

;(async () => {
  try {
    dotenv.config()

    const server = new HttpServer()

    const port = Number(process.env.PORT)!;
    if (!port || isNaN(Number(port))) throw new Error('PORT is not defined or is not a valid number')

    server.app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })

  } catch (error: any) {
    console.error('Error starting the server:', error.message)
    process.exit(1)
  }
  
})()