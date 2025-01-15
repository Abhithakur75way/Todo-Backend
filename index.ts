// src/index.ts

import express, { Application } from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user-routes";
import taskRoutes from "./src/routes/task-routes";
import connectDB from "./src/utils/db"; // MongoDB connection utility
import swaggerRoutes from "./src/swagger/swagger"; // Import Swagger setup

// Load environment variables BEFORE any other imports that might use them
dotenv.config();

// Initialize Express
const app: Application = express();
app.use(express.json());

// Connect to MongoDB using the connectDB function
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit(1);
  });

// Use Swagger UI for API documentation
app.use("/api", swaggerRoutes); // Swagger UI is now available at /api/api-docs

// Routes for user and task management
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
 