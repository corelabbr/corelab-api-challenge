import { Router } from "express"
import { createNotesController } from "../controllers/CreateNotesController"
import { updateNotesController } from "../controllers/UpdateNotesController"
import { findAllNotesController } from "../controllers/FindAllNotesController"
import { findByColorNotesController } from "../controllers/FindByColorNotesController"
import { findByFavoriteNotesController } from "../controllers/FindByFavoriteNotesController"
import { createNotesValidationMiddleware } from "../middlewares/CreateNotesValidationMiddleware"
import { deleteNotesController } from "../controllers/DeleteNotesController"
import { updateNotesValidationMiddleware } from "../middlewares/UpdateNotesValidationMiddleware"

const notesRoutes = Router()

//Post
notesRoutes.post("/notes", createNotesValidationMiddleware.validate, createNotesController.create)

//Put
notesRoutes.put("/notes/:id", 
    updateNotesValidationMiddleware.validate,
    updateNotesController.update
)

//Get
notesRoutes.get("/notes", findAllNotesController.findAll)
notesRoutes.get("/notes/color/:color", findByColorNotesController.findByColor)
notesRoutes.get("/notes/favorite/:favorite", findByFavoriteNotesController.findByFavorite)

//Delete
notesRoutes.delete("/notes/:id", deleteNotesController.delete)

export { notesRoutes }