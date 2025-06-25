
export const taskUpdateDoc = {
    '/task/{id}': {
        put: {
            tags: ['Tasks'],
            summary: 'Update Task',
            description: 'Update an existing task for the authenticated user',
            operationId: 'updateTask',
            security: [
                {
                    bearerAuth: [],
                }
            ],
            parameters: [  
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string'
                    },
                    description: 'ID of the task to update',
                }
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
                                prioridade: { type: 'string', enum: ['BAIXA', 'MEDIA', 'ALTA'], description: 'Priority of the task' },
                                status: { type: 'boolean', description: 'Completion status of the task' },
                                cor: { type: 'string', description: 'Color associated with the task' },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Task updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', format: 'uuid' },
                                    titulo: { type: 'string' },
                                    descricao: { type: 'string' },
                                    dataPrevista: { type: 'string', format: 'date-time' },
                                    prioridade: { type: 'string', enum: ['BAIXA', 'MEDIA', 'ALTA'] },
                                    status: { type: 'boolean' },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - At least one field must be provided to update the task',
                },
                404: {
                    description: 'Not Found - Task not found',
                },
                500: {
                    description: 'Internal Server Error - Failed to update task',
                },
            },
        },

        delete: {
            tags: ['Tasks'],
            summary: 'Delete Task',
            description: 'Delete an existing task for the authenticated user',
            operationId: 'deleteTask',
            security: [
                {
                    bearerAuth: [],
                }
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string'
                    },
                    description: 'ID of the task to delete',
                }
            ],
            responses: {
                200: {
                    description: 'Task deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'string', example: 'Task deleted' },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Invalid task ID provided',
                },
                404: {
                    description: 'Not Found - Task not found',
                },
                500: {
                    description: 'Internal Server Error - Failed to delete task',
                },
            },
        },

}}