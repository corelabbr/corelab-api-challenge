import { type Request, type Response } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export default {
  async create (req: Request, res: Response) {
    try {
      const bodySchema = z.object({
        title: z.string(),
        content: z.string(),
        color: z.string().optional(),
        favorite: z.boolean().optional()
      })
      const { title, content, color, favorite } = bodySchema.parse(req.body)
      const newTask = await prisma.task.create({
        data: {
          content,
          title,
          color,
          favorite
        }
      })
      return res.status(201).json(newTask)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async index (req: Request, res: Response) {
    try {
      const allTasks = await prisma.task.findMany({
        orderBy: {
          updatedAt: 'desc'
        }
      })
      return res.status(200).json(allTasks)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async update (req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid()
      })
      const bodySchema = z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        color: z.string().optional(),
        favorite: z.boolean().optional()
      })
      const { id } = paramsSchema.parse(req.params)

      const { title, content, color, favorite } = bodySchema.parse(req.body)

      const updateTask = await prisma.task.update({
        where: {
          id
        },
        data: {
          color,
          content,
          title,
          favorite
        }
      })
      return res.status(200).json(updateTask)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async destroy (req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid()
      })

      const { id } = paramsSchema.parse(req.params)

      await prisma.task.delete({
        where: {
          id
        }
      })
      return res.status(200).json('ok')
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async updateFavorite (req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid()
      })

      const { id } = paramsSchema.parse(req.params)

      const bodySchema = z.object({
        favorite: z.boolean()
      })
      const { favorite } = bodySchema.parse(req.body)
      const updateFavoriteTask = await prisma.task.update({
        where: {
          id
        },
        data: {
          favorite
        }
      })
      return res.status(200).json(updateFavoriteTask)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async changeColor (req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid()
      })

      const { id } = paramsSchema.parse(req.params)

      const bodySchema = z.object({
        color: z.string()
      })
      const { color } = bodySchema.parse(req.body)
      const changeColorTask = await prisma.task.update({
        where: {
          id
        },
        data: {
          color
        }
      })
      return res.status(200).json(changeColorTask)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
