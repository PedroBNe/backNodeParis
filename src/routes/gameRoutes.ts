import { Router } from "express";
import { addGame, listUserGames } from "../controller/gameController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", addGame); // Criar jogo
router.get("/", listUserGames); // Listar jogos do usuário

export default router;
