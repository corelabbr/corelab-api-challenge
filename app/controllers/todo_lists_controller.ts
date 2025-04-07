import type { HttpContext } from '@adonisjs/core/http'
import TodoList from '#models/todo_list'
import { createTodoListValidator, updateTodoListValidator } from '#validators/todo_list'
import { errors as vineError } from '@vinejs/vine'

export default class TodoListsController {
  /**
   * Exibir uma Task de recursos
   */
  async index({ response, request }: HttpContext) {
    try {
      // Obter a consulta de busca da requisição
      const { q } = request.qs()
      // Se houver uma consulta de busca, procurar Tasks de tarefas
      if (q) {
        // Procurar Tasks pelo título ou pela cor
        let lists = await TodoList.query().whereILike('title', `${q}%`)
        if (lists.length === 0) {
          lists = await TodoList.query().whereILike('color', `#${q}`)
        }
        // Retornar as Tasks de tarefas
        return response.status(200).send({ lists })
      }
      // Se não houver consulta de busca, buscar todas as Tasks de tarefas
      const todoLists = await TodoList.all()

      // Retornar as Tasks de tarefas
      return response.status(200).send({ lists: todoLists })
    } catch (error: unknown) {
      console.log(error)
      return response.status(500).send({ message: 'Erro no Servidor' })
    }
  }

  /**
   * Lidar com o envio do formulário para a ação de criação
   */
  async store({ request, response }: HttpContext) {
    try {
      // Validar os dados da requisição usando Vine
      const validatedData = await request.validateUsing(createTodoListValidator)

      // Criar Task
      const list = await TodoList.create(validatedData)

      // Retornar a Task criada
      return response.status(200).send({ list })
    } catch (error: unknown) {
      if (error instanceof vineError.E_VALIDATION_ERROR) {
        return response.status(error.status).send({ errors: error.messages })
      }
      return response.status(500).send({ message: 'Erro no Servidor' })
    }
  }

  /**
   * Editar um registro individual
   */
  async edit({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const data = await request.validateUsing(updateTodoListValidator)
      const list = await TodoList.find(id)
      if (!list) {
        return response.status(404).send({ message: 'Task não encontrada!' })
      }

      list.merge(data)
      await list.save()

      return { message: 'Task editada!', list }
    } catch (error) {
      if (error instanceof vineError.E_VALIDATION_ERROR) {
        console.log(error.messages)
        return response.status(401).send({ messageError: error.messages })
      } else {
        return response.status(500).send({ message: 'Erro no Servidor' })
      }
    }
  }

  /**
   * Excluir registro
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = params
    const list = await TodoList.find(id)

    if (!list) {
      return response.status(404).send({ message: 'Task não encontrada!' })
    }

    await list.delete()
    return response.status(200).send({ message: 'Task excluída' })
  }
}
