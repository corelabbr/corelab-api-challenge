import { Router } from "express";
import { taskRoutes } from "modules/task/infra/http/task.routes";

const router = Router();

router.use('/tasks', taskRoutes);

export default router;