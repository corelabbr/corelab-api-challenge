//--------------------------import creates---------------------
import { LoginController } from '../controllers/login/LoginController';
import { CreateUsersController } from '../controllers/users/CreateUsersController';
import { CreateTaskController } from '../controllers/tasks/CreateTaskController';

//------------------import finds---------------------------
import { FindUserByIdController } from '../controllers/users/FindUserByIdController';
import { FindAllUsersController } from '../controllers/users/FindAllUsersController';
import { FindTaskByIdController } from '../controllers/tasks/FindTaskByIdController';
import { FindAllTasksByUserIdController } from '../controllers/tasks/FindAllTasksByUserIdController';
import {FindFavoritesTasksController} from '../controllers/typeNotes/FindTaskByTypeController'
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
import { CreateTypeNotesController } from '../controllers/typeNotes/CreateTypeNotesController';
import { UpdateTypeController } from '../controllers/typeNotes/UpdateTypeNotesController';

const router: Router = Router();
const upload = Multer();

//-------------Creates------------------------------------
const createUser = new CreateUsersController();
router.post('/createUser', upload.single('image'), createUser.handle);

const loginUser = new LoginController();
router.post('/login', loginUser.handle);

const createTask = new CreateTaskController();
router.post('/createTask', createTask.handle);

const createTypeNotes= new CreateTypeNotesController();
router.post('/createType',createTypeNotes.handle);

//-------------Finds------------------------------------
const findUserById = new FindUserByIdController();
router.get('/findUserId', findUserById.handle);

const findAllUsers = new FindAllUsersController();
router.get('/users', findAllUsers.handle);

const findTaskId = new FindTaskByIdController();
router.get('/findTaskId', findTaskId.handle);

const findAllTaskByUser = new FindAllTasksByUserIdController();
router.get('/findTasks/:id', findAllTaskByUser.handle);

const findFavoritesTasks = new FindFavoritesTasksController();
router.get('/findFavorites/:id',findFavoritesTasks.handle)

//-------------Updates------------------------------------
const updateUser = new UpdateUserController();
router.patch('/updateUser', updateUser.handle);

const updateTask = new UpdateTaskController();
router.patch('/updateTask', updateTask.handle);

const updateCompleteTask = new UpdateCompletedTaskController();
router.patch('/updateCompleteTask', updateCompleteTask.handle);
const updateTypeController= new UpdateTypeController();
router.patch('/updateType/id', updateTypeController.handle);

//-------------Deletes------------------------------------
const deleteUser = new DeleteUserByIdController();
router.delete('/deleteUser', deleteUser.handle);

const deleteTask = new DeleteTaskController();
router.delete('/deleteTask/:id', deleteTask.handle);

export { router };
