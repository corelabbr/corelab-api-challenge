//--------------------------import creates---------------------
import { LoginController } from '../controllers/login/LoginController';
import { CreateUsersController } from '../controllers/users/CreateUsersController';
import { CreateTaskController } from '../controllers/tasks/CreateTaskController';

//------------------import finds---------------------------
import { FindUserByIdController } from '../controllers/users/FindUserByIdController';
import { FindAllUsersController } from '../controllers/users/FindAllUsersController';
import { FindTaskByIdController } from '../controllers/tasks/FindTaskByIdController';
import { FindAllTasksByUserIdController } from '../controllers/tasks/FindAllTasksByUserIdController';

//------------------import updates---------------------------
import { UpdateUserController } from '../controllers/users/UpdateUserController';
import { UpdateTaskController } from '../controllers/tasks/UpdateTaskController';
import { UpdateCompletedTaskController } from '../controllers/tasks/UpdateCompletedTaskController';

//------------------import deletes---------------------------
import { DeleteUserByIdController } from '../controllers/users/DeleteUserByIdController';
import { DeleteTaskController } from '../controllers/tasks/DeleteTaskController';
//---------------------------------------------------------------------
import { Router } from 'express';
import Multer from 'multer';

const router: Router = Router();
const upload = Multer();

//-------------Creates------------------------------------
const createUser = new CreateUsersController();
router.post('/createUser', upload.single('imgUser'), createUser.handle);

const loginUser = new LoginController();
router.post('/login', loginUser.handle);

const createTask = new CreateTaskController();
router.post('/createTask', createTask.handle);

//-------------Finds------------------------------------
const findUserById = new FindUserByIdController();
router.get('/findUserId', findUserById.handle);

const findAllUsers = new FindAllUsersController();
router.get('/allUsers', findAllUsers.handle);

const findTaskId = new FindTaskByIdController();
router.get('/findTaskId', findTaskId.handle);

const findAllTaskByUser = new FindAllTasksByUserIdController();
router.get('/findTaskByUser', findAllTaskByUser.handle);

//-------------Updates------------------------------------
const updateUser = new UpdateUserController();
router.patch('/updateUser', updateUser.handle);

const updateTask = new UpdateTaskController();
router.patch('/updateTask', updateTask.handle);

const updateCompleteTask = new UpdateCompletedTaskController();
router.patch('/updateCompleteTask', updateCompleteTask.handle);

//-------------Deletes------------------------------------
const deleteUser = new DeleteUserByIdController();
router.delete('/deleteUser', deleteUser.handle);

const deleteTask = new DeleteTaskController();
router.delete('/deleteTask', deleteTask.handle);

export { router };
