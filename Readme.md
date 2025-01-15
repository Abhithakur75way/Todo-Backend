Task Manager App
A simple and efficient task management system built with Node.js and Express.js. The API allows users to sign up, sign in, and manage tasks with role-based authentication (Admin/User). This project is equipped with a well-documented REST API, providing functionalities such as task creation, viewing tasks, and user management.

Table of Contents
Overview
Features
Technology Stack
Setup Instructions
Installation
Environment Configuration
Run the Project
API Documentation
Authentication
Task Management
Folder Structure
Contributing
License
Overview
This API allows users to manage tasks in a project-based system. The API supports role-based authentication, with two primary roles: Admin and User.

Admin: Can create tasks, view all tasks, and manage users.
User: Can only view tasks assigned to them.
The API is fully documented with Swagger UI and is designed with scalability and maintainability in mind.

Features
User Management:

Sign up and sign in functionality.
JWT-based authentication and session management.
Task Management:

Admin users can create new tasks.
Regular users can view tasks assigned to them.
Admins can view all tasks and manage them.
Role-Based Access Control (RBAC):

Secured routes using JWT tokens and role validation.
API Documentation:

Comprehensive Swagger UI documentation for API endpoints.
Technology Stack
This project uses the following technologies:

Backend Framework: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
API Documentation: Swagger UI, Swagger JSDoc
ORM: Mongoose (for MongoDB)
Environment Management: dotenv
Security: Role-based access control with middleware for user authentication and authorization



Task Management
Create Task (Admin Only):
POST request to /api/tasks with the task data.
View Tasks:
GET request to /api/tasks to view tasks assigned to the authenticated user.
Admin users can access all tasks, while regular users can only view their assigned tasks.

Folder Structure
The project follows a modular folder structure, making it scalable and easy to maintain.

bash
Copy code
/src
  /controllers
    - user-controller.ts        # Logic for handling user-related API requests
    - task-controller.ts        # Logic for handling task-related API requests
  /middleware
    - auth-middleware.ts        # Middleware for user authentication (JWT validation)
    - role-middleware.ts        # Middleware for role-based access control
  /models
    - user-model.ts             # Mongoose model for user data
    - task-model.ts             # Mongoose model for task data
  /routes
    - user-routes.ts            # API routes for user management
    - task-routes.ts            # API routes for task management
  /swagger
    - swagger.ts                # Swagger documentation setup and configuration
  /utils
    - db.ts                     # MongoDB connection setup
  index.ts                      # Main server entry point
  .env                          # Environment variables
  package.json                  # Project metadata and dependencies
  tsconfig.json                 # TypeScript configuration
Contributing
Contributions are welcome! If you find a bug or want to improve the project, feel free to fork this repository, create a new branch, and submit a pull request.

Steps to Contribute:
Fork the repository.
Create a new branch for your feature or fix.
Make your changes and test them.
Create a pull request with a description of your changes.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions or feedback, feel free to reach out to:

Email: abhithakur.75way@gmail.com
GitHub: Abhithakur75way
