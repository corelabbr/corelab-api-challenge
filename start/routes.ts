/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import TasksController from '../app/controllers/tasks_controller.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('/api/tasks', TasksController)