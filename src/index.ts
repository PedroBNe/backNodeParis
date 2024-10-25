import express from "express";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import gameMemoryRoutes from "./routes/gameMemoryRoutes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://meu-frontend.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/game-memory", gameMemoryRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
