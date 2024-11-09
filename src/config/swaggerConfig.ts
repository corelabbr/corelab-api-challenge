import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'corelab_api_challenge',
    version: '1.0.0',
    description: 'API documentation for the project corelab_api_challenge',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
    },
  ],
  paths: {
    '/notes': {
      post: {
        summary: 'Create a new note',
        description: 'Creates a new note in the system. The text field is required; title, color, and favorite are optional.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Title of the note',
                    example: 'Note Title'
                  },
                  text: {
                    type: 'string',
                    description: 'Text content of the note',
                    example: 'This is the note text.',
                    minLength: 1
                  },
                  color: { 
                    type: 'string', 
                    description: 'Updated color of the note', 
                    example: 'white' 
                  },
                  favorite: { 
                    type: 'boolean', 
                    description: 'Is the note a favorite', 
                    example: false 
                  }
                },
                required: ['text']
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Note created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Note'
                }
              }
            }
          },
          '400': { description: 'Bad request. Possible validation errors or missing required fields.' },
          '422': { description: 'Unprocessable Entity. Text field is required but was not provided.' },
          '500': { description: 'Internal server error' }
        },
        tags: ['Notes']
      },
      get: {
        summary: 'Get all notes',
        description: 'Retrieves all notes from the system. Returns a list of notes.',
        responses: {
          '200': {
            description: 'A list of notes retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Note' }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error. An unexpected error occurred while retrieving the notes.'
          }
        },
        tags: ['Notes']
      }

    },
    '/notes/color/{color}': {
      get: {
        summary: 'Get notes by color',
        description: 'Retrieves notes that match the specified color',
        parameters: [
          {
            name: 'color',
            in: 'path',
            required: true,
            description: 'Color of the notes to retrieve',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Notes retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Note' }
                }
              }
            }
          },
          '404': { description: 'No notes found for the specified color' },
          '500': { description: 'Internal server error' }
        },
        tags: ['Notes']
      }
    },
    '/notes/favorite/{favorite}': {
      get: {
        summary: 'Get notes by favorite status',
        description: 'Retrieves notes based on whether they are marked as favorite or not',
        parameters: [
          {
            name: 'favorite',
            in: 'path',
            required: true,
            description: 'Indicates whether to retrieve favorite notes (true) or non-favorite notes (false)',
            schema: {
              type: 'string',
              enum: ['true', 'false']
            }
          }
        ],
        responses: {
          '200': {
            description: 'Notes retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Note' }
                }
              }
            }
          },
          '404': { description: 'No notes found for the specified favorite status' },
          '500': { description: 'Internal server error' }
        },
        tags: ['Notes']
      }
    },
    '/notes/{id}': {
      put: {
        summary: 'Update a note by ID',
        description: 'Updates the details of a specific note',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the note to update',
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string', description: 'Title of the note', example: 'Updated Note Title' },
                  text: { type: 'string', description: 'Updated text content of the note', example: 'This is the updated note text.' },
                  color: { type: 'string', description: 'Updated color of the note', example: 'red' },
                  favorite: { type: 'boolean', description: 'Is the note a favorite', example: false }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Note updated successfully' },
          '400': { description: 'Bad request' },
          '404': { description: 'Note not found' },
          '500': { description: 'Internal server error' }
        },
        tags: ['Notes']
      },
      delete: {
        summary: 'Delete a note by ID',
        description: 'Deletes a specific note from the system',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the note to delete',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '204': { description: 'Note deleted successfully' },
          '404': { description: 'Note not found' },
          '500': { description: 'Internal server error' }
        },
        tags: ['Notes']
      }
    }
  },
  components: {
    schemas: {
      Note: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID of the note' },
          title: { type: 'string', description: 'Title of the note' },
          text: { type: 'string', description: 'Text content of the note' },
          color: { type: 'string', description: 'Color of the note' },
          favorite: { type: 'boolean', description: 'Is the note a favorite' }
        }
      }
    }
  }
}

const options = {
  swaggerDefinition: swaggerConfig,
  apis: [
    '../../dist/app/controllers/*.js',
    '../../dist/app/routes/*.routes.js',
  ]
}

const swaggerSpec = swaggerJSDoc(options)

export { swaggerUi, swaggerSpec }
