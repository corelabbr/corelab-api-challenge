import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { INote } from 'App/Types/Note'
import Mongo from '@ioc:Database/Mongo'
import { ObjectId } from 'mongodb'

export default class NotesController {
    public async index(ctx: HttpContextContract) {
      try {
        const db = Mongo.getDb('corelab')
        const collection = db?.collection('notes')
        const notes = await collection?.find().toArray()
        return notes
      } catch (error) {
        console.log(error)
        return ctx.response.status(500).json({ message: 'Erro ao buscar notas: ' + error })
      }
    }

    public async store(ctx: HttpContextContract) {
      const { title, body, colorId, isFavorite } = ctx.request.body()
      console.log(title, body, colorId, isFavorite)

      const note: INote = {
        title,
        body,
        colorId: colorId || '',
        isFavorite,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      try {
        const db = Mongo.getDb('corelab')
        const collection = db?.collection('notes')
  
        await collection?.insertOne(note)

        return ctx.response.status(201).json({ message: 'Nota criada com sucesso', note })
      } catch (error) {
        console.log(error)
        return ctx.response.status(500).json({ message: 'Erro ao criar nota: ' + error })
      }
    }

    public async update(ctx: HttpContextContract) {
      const { _id } = ctx.params
      const { title, body, colorId, isFavorite, createdAt, updatedAt } = ctx.request.body()
      const updateTimestamp = ctx.request.input('updateTimestamp', false)

      const note: INote = {
        title,
        body,
        colorId: colorId || '',
        isFavorite,
        createdAt,
        updatedAt: updateTimestamp ? new Date() : updatedAt
      }

      try {
        const db = Mongo.getDb('corelab')
        const collection = db?.collection('notes')
        
        await collection?.updateOne(
          { _id: ObjectId.createFromHexString(_id) }, 
          { $set: note }
        )

        return ctx.response.status(200).json({ message: 'Nota atualizada com sucesso', note })
      } catch (error) {
        console.log(error)
        return ctx.response.status(500).json({ message: 'Erro ao atualizar nota: ' + error })
      }
    }

    public async destroy(ctx: HttpContextContract) {
      const { _id } = ctx.params

      try {
        const db = Mongo.getDb('corelab')
        const collection = db?.collection('notes')
        
        await collection?.deleteOne({ _id: ObjectId.createFromHexString(_id) })

        return ctx.response.status(200).json({ message: 'Nota removida com sucesso' })
      } catch (error) {
        console.log(error)
        return ctx.response.status(500).json({ message: 'Erro ao remover nota: ' + error })
      }
    }   
}
