import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox'; 
import {
  createHandler,
  deleteHandler,
  favoriteHandler,
  findAllHandler,
  findByIdHandler,
  updateHandler,
} from '../handlers/todos';
import {
  ItemSchema,
  CreateItemSchema,
  UpdateItemSchema,
  ItemIdParams,
  ErrorResponse,
} from '../schemas/todos';

export async function todoRoutes(fastify: FastifyInstance) {
  fastify.get('/todos', {
    schema: {
      tags: ['todos'],
      summary: 'Lista todos os itens',
      response: {
        200: Type.Array(ItemSchema),
        500: ErrorResponse,
      },
    },
  }, findAllHandler);

  fastify.post('/todo', {
    schema: {
      tags: ['todos'],
      summary: 'Cria um novo item',
      body: CreateItemSchema,
      response: {
        201: ItemSchema,
        400: ErrorResponse,
        500: ErrorResponse,
      },
    },
  }, createHandler);

  fastify.get('/todos/:id', {
    schema: {
      tags: ['todos'],
      summary: 'Busca um item por ID',
      params: ItemIdParams,
      response: {
        200: ItemSchema,
        404: ErrorResponse,
        500: ErrorResponse,
      },
    },
  }, findByIdHandler);

  fastify.patch('/todos/:id', {
    schema: {
      tags: ['todos'],
      summary: 'Atualiza um item',
      params: ItemIdParams,
      body: UpdateItemSchema,
      response: {
        200: ItemSchema,
        404: ErrorResponse,
        500: ErrorResponse,
      },
    },
  }, updateHandler);

  fastify.patch('/todos/:id/favorite', {
    schema: {
      tags: ['todos'],
      summary: 'Alterar status de favorito',
      params: ItemIdParams,
      response: {
        200: ItemSchema,
        404: ErrorResponse,
        500: ErrorResponse,
      },
    },
  }, favoriteHandler);

  fastify.delete('/todos/:id', {
    schema: {
      tags: ['todos'],
      summary: 'Deleta um item (soft delete)',
      params: ItemIdParams,
      response: {
        204: { 
          type: 'null',
          description: 'Sucesso sem conteúdo' 
        },
        404: ErrorResponse,
        500: ErrorResponse
      }
    }
  }, deleteHandler);
}