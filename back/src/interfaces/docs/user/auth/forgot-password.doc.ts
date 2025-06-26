export const forgotPasswordDoc = {
  '/forgot-password': {
    post: {
      tags: ['User'],
      description: 'Forgot Password',
      operationId: 'forgotPassword',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'The email address associated with the account.',
                  example: 'example@gmail.com',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Password reset link sent successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Password reset link sent to your email.',
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Bad Request - Invalid email format or missing email.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Invalid email format or missing email.',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
