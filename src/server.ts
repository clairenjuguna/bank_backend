// src/server.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Routes

import userRoutes from "./routes/userRoutes";

import transactionRoutes from "./routes/transactionRoutes";



// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); 

// Routes

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Root route
app.get("/", (_req, res) => {
  res.send("🚀 Banking API is running");
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});

