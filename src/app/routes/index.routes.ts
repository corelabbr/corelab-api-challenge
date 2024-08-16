import { Router } from "express"
import { notesRoutes } from "./notes.routes"

const routes = Router()

routes.use(
    notesRoutes
)

export { routes }