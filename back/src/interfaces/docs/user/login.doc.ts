
export const authLoginDoc = {
  '/login': {
    post: {
      tags: ['User'],
      summary: 'Login',
      description: 'Login to the application',
      operationId: 'login',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email address of the user',
                },
                senha: {
                  type: 'string',
                  description: 'Password for the user account',
                },
                },
                required: ['email', 'senha'],
                },
            },
          },
        },
      responses: {
        200: {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                    description: 'JWT token for authenticated user',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized - Invalid credentials',
        },
        500: {
          description: 'Internal Server Error - Login failed',
        },
      },
    },
  },
}