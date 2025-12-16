import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { C_Notas, NotasModel } from '../Types/Notas'

export default class NotasController {
  public async inserirNotas({ request, response }: HttpContextContract) {
    try {
      const notas = request.body() as C_Notas
      const nota = await NotasModel.insertNotas(notas)
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
  public async getIdNotas({ params, response }: HttpContextContract) {
    try {
      const id = params.id
      const notas = await NotasModel.getIdNotas(id)

      if (!notas) {
        return response.status(404).json({ error: 'Notas não encontradas' })
      }

      return response.json(notas)
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
  public async getAllNotas({ response }: HttpContextContract) {
    try {
      const notas = await NotasModel.getAllNotas()

      return response.json(notas)
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
  public async deleteNota({ params, response }: HttpContextContract) {
    try {
      const id = params.id
      const deleted = await NotasModel.deleteNota(id)

      if (!deleted) {
        return response.status(404).json({ error: 'Nota não encontrada' })
      }

      return response.json(deleted)
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  public async updateNota({ params, request, response }: HttpContextContract) {
    try {
      const id = params.id
      const notaData = request.body() as C_Notas

      const updated = await NotasModel.updateNota(id, notaData)

      if (!updated) {
        return response.status(404).json({ error: 'Nota não encontrada' })
      }

      return response.status(200).json(updated)
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  public async getAllNotasFav({ response }: HttpContextContract) {
    try {
      const notas = await NotasModel.getAllNotasFav()

      return response.json(notas)
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  public async getAllNotasNoFav({ response }: HttpContextContract) {
    try {
      const notas = await NotasModel.getAllNotasNoFav()

      return response.json(notas)
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  public async getIdcor({ params, response }: HttpContextContract) {
    try {
      const id = params.id
      const notas = await NotasModel.getIdcor(id)

      if (!notas) {
        return response.status(404).json({ error: 'Notas não encontradas' })
      }

      return response.json(notas)
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
