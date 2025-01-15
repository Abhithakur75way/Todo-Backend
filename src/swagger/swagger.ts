// src/swagger.ts

import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger options - define the basic metadata and paths
const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "Task Manager API",
    version: "1.0.0",
    description: "API documentation for the Task Manager application",
  },
  servers: [
    {
      url: `http://localhost:8000/api-docs`, // Replace with the appropriate server URL
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
  },
  paths: {
    "/signup": {
      post: {
        summary: "Sign up a new user",
        description: "Allows a new user to sign up with a username and password.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                    example: "john_doe",
                  },
                  password: {
                    type: "string",
                    example: "password123",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request, invalid input",
          },
        },
      },
    },
    "/signin": {
      post: {
        summary: "Sign in an existing user",
        description: "Allows a user to sign in using their username and password.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                    example: "john_doe",
                  },
                  password: {
                    type: "string",
                    example: "password123",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful login, returns a JWT token",
          },
          400: {
            description: "Bad request, invalid credentials",
          },
        },
      },
    },
    "/tasks": {
      post: {
        summary: "Create a new task",
        description: "Only admins can create tasks. Requires authentication and admin role.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    example: "Complete the project",
                  },
                  description: {
                    type: "string",
                    example: "Finish the project by the end of the week.",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
          },
          403: {
            description: "Forbidden, admin role required",
          },
        },
      },
      get: {
        summary: "Get all user tasks",
        description: "Fetches all tasks assigned to the authenticated user.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "A list of tasks assigned to the user",
          },
          401: {
            description: "Unauthorized, user must be authenticated",
          },
        },
      },
    },
  },
};

// Generate Swagger documentation from the options
const swaggerDocs = () => {
  const options = {
    swaggerDefinition: swaggerOptions,
    apis: ["./src/routes/*.ts"], // Path to your route files
  };

  return swaggerJsdoc(options);
};

// Setting up Swagger UI
const router = Router();

/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: Returns the Swagger UI documentation
 *     description: Provides the interactive API documentation for the application.
 *     responses:
 *       200:
 *         description: The Swagger UI with API documentation
 */
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs()));

export default router;
