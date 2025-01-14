import express, { Application } from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user-routes";
import taskRoutes from "./src/routes/task-routes";
import connectDB from "./src/utils/db"; // Import the connectDB function

// Load environment variables BEFORE any other imports that might use them
dotenv.config();

const app: Application = express();
app.use(express.json());

// Connect to MongoDB using the connectDB function
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit(1);
  });

// Routes
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
