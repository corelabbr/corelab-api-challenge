import { Router } from 'express'
import TodoController from '../api/controllers/TodoController'

const router: Router = Router()

router
  .route('/todos')
  .get(TodoController.getTodos)
  .post(TodoController.upsertTodo)

router
  .route('/todos/:todoId')
  .put(TodoController.upsertTodo)
  .delete(TodoController.deleteTodo)

router.put('/todos/toggle_favorite/:todoId', TodoController.toggleFavoriteTodo)
router.put('/todos/change_color/:todoId', TodoController.changeTodoColor)

export default router
