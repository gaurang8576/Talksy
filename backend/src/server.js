import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { listUsers } from "./services/userService.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", async (_req, res) => {
  try {
    const users = await listUsers();

    res.json({
      name: "Talksy API",
      status: "running",
      collection: "users",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      name: "Talksy API",
      status: "error",
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
