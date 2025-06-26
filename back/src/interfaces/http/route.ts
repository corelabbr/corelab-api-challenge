import { Router } from 'express';
import { authenticateToken } from '@interfaces/middlewares/auth-middleware';
import { factories } from './factories';

export const router  = Router();

// Auth & User Controllers
const forgotPasswordController = factories.makeForgotPasswordController();
const resetPasswordController = factories.makeResetPasswordController();
const registerController = factories.makeRegisterController();
const loginController = factories.makeLoginController();

// task controllers
const createTaskController = factories.makeCreateController();
const updateTaskController = factories.makeUpdateTaskController();
const readAllTaskController = factories.makeReadController();
const deleteTaskController = factories.makeDeleteTaskController();

// public routes
router.post('/register', async (req, res) => {
    await registerController.register(req, res);
});

router.post('/login', async (req, res) => {
    await loginController.login(req, res);
});

router.post('/forgot-password', async (req, res) => {
  await forgotPasswordController.forgotPassword(req, res);
});

router.post('/reset-password', async (req, res) => {
    await resetPasswordController.resetPassword(req, res);
});

// private routes
router.post('/tasks', authenticateToken, async (req, res) => {
    await createTaskController.create(req, res);
});

router.get('/tasks', authenticateToken, async (req, res) => {
    await readAllTaskController.getAllTasks(req, res);
});

router.put('/task/:id', authenticateToken, async (req, res) => {
     await updateTaskController.update(req, res);
});

router.delete('/task/:id', authenticateToken, async (req, res) => {
    await deleteTaskController.delete(req, res);
});