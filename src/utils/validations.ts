import { Colors, Todos } from '@prisma/client'
import BadRequestException from '../api/exceptions/BadRequestException'
import prisma from '../libs/prisma'
import NotFoundException from '../api/exceptions/NotFoundException'
import errors from '../api/errors'

function validValueOrError(value: string, msg: string) {
  if (!value) throw new BadRequestException(msg)
  if (Array.isArray(value) && value.length === 0)
    throw new BadRequestException(msg)
  if (typeof value === 'string' && !value.trim().length)
    throw new BadRequestException(msg)
}

function colorExistsOrError(color: Colors, msg: string) {
  if (!Object.values(Colors).includes(color)) {
    throw new BadRequestException(msg)
  }
}

async function todoExistsOrError(todoId: string): Promise<Todos> {
  const todo = await prisma.todos.findUnique({ where: { id: todoId } })
  if (!todo) throw new NotFoundException(errors.notFound.todo)
  return todo
}

export { validValueOrError, colorExistsOrError, todoExistsOrError }
