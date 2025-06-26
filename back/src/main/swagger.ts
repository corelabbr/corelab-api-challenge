import swaggerJSDoc from "swagger-jsdoc";
import { swaggerPaths } from "@interfaces/docs";

const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scraper Mailer API",
      version: "0.1.0",
      description: "NexoTask API Project: A RESTful API for task management, including full CRUD operations and user authentication. Built with Node.js and TypeScript, using Prisma for database access and JWT for secure authentication.",
      contact: {
        name: "NexoTask",
        url: "http://localhost:3001/"
      },
    },  
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: swaggerPaths,
  },
  apis: ["./src/interfaces/http/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerConfig);
