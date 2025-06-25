

export const resetPasswordDoc = {
    '/reset-password': {
        post: {
        tags: ['User'],
        description: 'Reset Password',
        operationId: 'resetPassword',
        requestBody: {
            required: true,
            content: {
            'application/json': {
                schema: {
                type: 'object',
                required: ['token', 'newPassword'],
                properties: {
                    token: {
                    type: 'string',
                    description: 'The password reset token sent to the user\'s email.',
                    example: 'abc123xyz456',
                    },
                    newPassword: {
                    type: 'string',
                    format: 'password',
                    description: 'The new password for the user account.',
                    example: 'NewSecurePassword123!',
                    },
                },
                },
            },
            },
        },
        responses: {
            '200': {
            description: 'Password reset successfully.',
            content: {
                'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                    message: {
                        type: 'string',
                        example: 'Password has been reset successfully.',
                    },
                    },
                },
                },
            },
            },
            '400': {
            description: 'Bad Request - Invalid token or missing fields.',
            content: {
                'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                    error: {
                        type: 'string',
                        example: 'Invalid token or missing fields.',
                    },
                    },
                },
                },
            },
            },
        },
        },
    },
}