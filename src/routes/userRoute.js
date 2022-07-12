import { Router } from "express";
import {addFavorite, getFavorites} from "../controllers/userController.js";
import validateFavorite from "../middlewares/validateFavoriteMiddleware.js";

const route = Router();

route.post("/favorites", validateFavorite, addFavorite)
route.get("/favorites", getFavorites);

export default route;