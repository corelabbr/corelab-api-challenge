

export const taskDoc = {
  '/tasks': {
    get: {
      tags: ['Tasks'],
        summary: 'Get All Tasks',
        description: 'Retrieve all tasks for the authenticated user',
        operationId: 'getAllTasks',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'List of tasks retrieved successfully',
            content: {
              'application/json': {
              },
            },
          },
          401: {
            description: 'Unauthorized - Invalid or missing token',
          },
          500: {
            description: 'Internal Server Error - Failed to retrieve tasks',
          },
        },
    },

    post: {
      tags: ['Tasks'],
      summary: 'Create Task',
      description: 'Create a new task for the authenticated user',
      operationId: 'createTask',
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                titulo: { type: 'string', description: 'Title of the task' },
                descricao: { type: 'string', description: 'Description of the task' },
                dataPrevista: { type: 'string', format: 'date-time', description: 'Due date for the task' },
                prioridade: {type: 'string', enum: ['BAIXA', 'MEDIA', 'ALTA'], description: 'Priority of the task' },
                status: { type: 'boolean', description: 'Completion status of the task' },
                cor: { type: 'string', description: 'Color associated with the task' },
              },
              required: ['title'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Task created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  completed: { type: 'boolean' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid input data',
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
        },
        500: {
          description: 'Internal Server Error - Failed to create task',
        },
      },
    },

}}