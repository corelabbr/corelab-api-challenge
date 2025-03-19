import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  // Função auxiliar para validar IDs
  private validateId(id: string | undefined) {
    if (!id) {
      return { valid: false, message: 'ID is required' }
    }
    if (isNaN(Number(id))) {
      return { valid: false, message: 'ID must be a number' }
    }
    if (Number(id) <= 0) {
      return { valid: false, message: 'ID must be greater than 0' }
    }
    return { valid: true }
  }

  // Listar todas as tarefas com paginação e ordenação
  public async index({ request, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1) // Página atual, padrão é 1
      const limit = request.input('limit', 10) // Itens por página, padrão é 10
      const search = request.input('search', '') // Termo de busca (opcional)

      // Iniciar a query
      const tasksQuery = Task.query()

      // Aplicar busca, se fornecida
      if (search) {
        tasksQuery
          .where('title', 'like', `%${search}%`) // Busca no título
          .orWhere('description', 'like', `%${search}%`) // Busca na descrição
      }

      // Ordenar por favoritos primeiro e depois por outra coluna, se necessário
      const tasks = await tasksQuery
        .orderBy('isFavorite', 'desc') // Ordena os favoritos primeiro
        .paginate(page, limit)

      // Mapear os resultados para o formato desejado
      const tasksJSON = tasks.toJSON()
      tasksJSON.data = tasksJSON.data.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          isCompleted: task.isCompleted ? true : false,
          isFavorite: task.isFavorite ? true : false,
          color: task.color,
        }
      })

      return response.json(tasksJSON)
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }

  // Criar uma nova tarefa
  public async store({ request, response }: HttpContextContract) {
    try {
      const { title, description, isCompleted, isFavorite, color } = request.only([
        'title',
        'description',
        'isCompleted',
        'isFavorite',
        'color',
      ])

      // Validações
      if (!title) {
        return response.status(400).json({ message: 'Title is required' })
      }
      if (!description) {
        return response.status(400).json({ message: 'Description is required' })
      }
      if (isCompleted && typeof isCompleted !== 'boolean') {
        return response.status(400).json({ message: 'isCompleted must be a boolean' })
      }

      const task = await Task.create({ title, description, isCompleted, isFavorite, color })
      return response.status(201).json({
        id: task.id,
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        isFavorite: task.isFavorite,
        color: task.color,
      })
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }

  // Mostrar uma tarefa específica
  public async show({ params, response }: HttpContextContract) {
    try {
      const { valid, message } = this.validateId(params.id)
      if (!valid) {
        return response.status(400).json({ message })
      }

      const task = await Task.findOrFail(params.id)
      return response.json({
        id: task.id,
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        isFavorite: task.isFavorite,
        color: task.color,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Task not found' })
      }
      return response.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }

  // Atualizar uma tarefa
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const { valid, message } = this.validateId(params.id)
      if (!valid) {
        return response.status(400).json({ message })
      }

      const task = await Task.findOrFail(params.id)
      const data = request.only(['title', 'description', 'isCompleted', 'isFavorite', 'color'])
      task.merge(data)
      await task.save()

      return response.json({
        id: task.id,
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        isFavorite: task.isFavorite,
        color: task.color,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Task not found' })
      }
      return response.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }

  // Excluir uma tarefa
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const { valid, message } = this.validateId(params.id)
      if (!valid) {
        return response.status(400).json({ message })
      }

      const task = await Task.findOrFail(params.id)
      await task.delete()

      return response.status(204).json({ message: 'Task deleted' })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Task not found' })
      }
      return response.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }

  // Marcar/desmarcar como favorito
  public async toggleFavorite({ params, response }: HttpContextContract) {
    try {
      const { valid, message } = this.validateId(params.id)
      if (!valid) {
        return response.status(400).json({ message })
      }

      const task = await Task.findOrFail(params.id)
      task.isFavorite = !task.isFavorite
      await task.save()

      return response.json({
        id: task.id,
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        isFavorite: task.isFavorite,
        color: task.color,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Task not found' })
      }
      return response.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }
}
