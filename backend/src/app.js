import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectToMongo from "./db.js";
import { AuthApi } from "./middleware/AuthApi.js";
import userRoutes from "./router/routes.js";
import formatSeconds from "./utils/formatSeconds.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Vercel routes the frontend and API through one origin, so production requests
// do not require CORS. Keep CORS only for a local Vite development server.
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
}

// Wait for the cached MongoDB connection before handling application requests.
app.use(async (req, res, next) => {
  try {
    await connectToMongo();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.json({
    uptime: process.uptime(),
    uptimeFormatted: formatSeconds(process.uptime()),
  });
});

app.get("/home", AuthApi, (req, res) => {
  return res.send("This is my home page");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found", success: false });
});

app.use((error, req, res, next) => {
  console.error("Unhandled application error:", error);

  if (res.headersSent) {
    return next(error);
  }

  const isDatabaseError = error.name?.startsWith("Mongo") || error.name === "MongooseServerSelectionError";
  return res.status(isDatabaseError ? 503 : 500).json({
    message: isDatabaseError ? "Database temporarily unavailable" : "Internal server error",
    success: false,
  });
});

export { app };
