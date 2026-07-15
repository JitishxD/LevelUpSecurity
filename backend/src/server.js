import "dotenv/config";
import { app } from "./app.js";
import connectToMongo from "./db.js";

const port = process.env.PORT || 3000;
let server;

const startServer = async () => {
  try {
    await connectToMongo();
    server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
  }
};

const shutdown = (signal) => {
  console.log(`${signal} received; shutting down server.`);

  if (!server) {
    process.exit(0);
  }

  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();
