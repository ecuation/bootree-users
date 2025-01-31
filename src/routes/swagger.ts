import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bootree users API',
            version: '1.0.0',
            description: 'user microservice',
        },
        servers: [
            {
                url: 'http://bootree.test',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                BadRequestError: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Bad request",
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Applies Bearer Token globally
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };