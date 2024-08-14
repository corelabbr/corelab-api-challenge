import type { HttpContext } from '@adonisjs/core/http'
import Notes from '#models/notes'
import { schema } from '@adonisjs/validator'

export default class NotesController {
  // Fetch all notes
  public async index({ response }: HttpContext) {
    const notes = await Notes.all()

    return response.ok(notes)
  }

  // Create a new Note
  public async store({ request, response }: HttpContext) {
    const validationSchema = schema.create({
      title: schema.string.nullable({ trim: true }),
      content: schema.string.nullable({ trim: true }),
      color: schema.string.nullable({ trim: true }),
      favorite: schema.boolean.optional(),
    })

    try {
      await request.validate({ schema: validationSchema })

      const data = request.only(['title', 'content', 'color', 'favorite'])

      const note = await Notes.create(data)

      return response.created(note)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  // Update the title of a Note
  public async updateTitle({ params, request, response }: HttpContext) {
    const validationSchema = schema.create({
      title: schema.string.nullable({ trim: true }),
    })

    try {
      await request.validate({ schema: validationSchema })

      const note = await Notes.findOrFail(params.id)
      const { title } = request.only(['title'])

      note.title = title

      await note.save()

      return response.ok(note)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  // Update the content of a Note
  public async updateContent({ params, request, response }: HttpContext) {
    const validationSchema = schema.create({
      content: schema.string.nullable({ trim: true }),
    })

    try {
      await request.validate({ schema: validationSchema })

      const note = await Notes.findOrFail(params.id)
      const { content } = request.only(['content'])

      note.content = content

      await note.save()

      return response.ok(note)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  // Update the color of a Note
  public async updateColor({ params, request, response }: HttpContext) {
    const validationSchema = schema.create({
      color: schema.string.nullable({ trim: true }),
    })

    try {
      await request.validate({ schema: validationSchema })

      const note = await Notes.findOrFail(params.id)
      const { color } = request.only(['color'])

      note.color = color

      await note.save()

      return response.ok(note)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  // Toggle favorite status of a Note
  public async toggleFavorite({ params, response }: HttpContext) {
    try {
      const note = await Notes.findOrFail(params.id)

      note.favorite = !note.favorite

      await note.save()

      return response.ok(note)
    } catch (error) {
      return response.notFound('Note not found')
    }
  }

  // Delete a Note by ID
  public async destroy({ params, response }: HttpContext) {
    try {
      const note = await Notes.findOrFail(params.id)

      await note.delete()

      return response.noContent()
    } catch (error) {
      return response.notFound('Note not found')
    }
  }
}
