/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';

// Import controllers dynamically to avoid circular dependencies
const AuthController = () => import('#controllers/auth_controller');
const UsersController = () => import('#controllers/users_controller');
const TasksController = () => import('#controllers/tasks_controller');

router.get('/', async () => {
  return {
    hello: 'Welcome to the AdonisJS API',
  }
})

// Public routes
router.group(() => {
  router.post('/login', [AuthController, 'login']) // Login
  router.post('/register', [UsersController, 'store']) // Register users
}).prefix('/api')

// Protected routes - users
router.group(() => {
  router.get('/users', [UsersController, 'index']) // List users
  router.get('/users/:id', [UsersController, 'show']) // Show user by ID
  router.put('/users/:id', [UsersController, 'update']) // Update user
  router.delete('/users/:id', [UsersController, 'destroy']) // Delete user
  router.get('/profile', [UsersController, 'profile']) // User profile
}).prefix("/api").use(middleware.auth()) // Apply auth middleware to this group

// Protected routes - task
router.group(() => {
  // CRUD
  router.resource('tasks', TasksController).apiOnly()
  // Custom routes for tasks
  router.patch('tasks/:id/favorite', [TasksController, 'toggleFavorite'])
  router.patch('tasks/:id/color', [TasksController, 'updateColor'])
}).prefix("/api").use(middleware.auth()) // Apply auth middleware to this group

//The search route is http://localhost:3333/api/tasks?title=anotar (example)
