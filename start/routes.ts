/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import TodoListsController from '#controllers/todo_lists_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('/', [TodoListsController, 'index'])
    router.post('/create', [TodoListsController, 'store'])
    router.put('/edit/:id', [TodoListsController, 'edit'])
    router.delete('/delete/:id', [TodoListsController, 'destroy'])
}).prefix('api/todo')
