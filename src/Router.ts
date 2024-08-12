import { Router } from "express";
const router = Router();

import postRoutes from "./routes/postRoutes";


router.use("/posts", postRoutes);


export default router;