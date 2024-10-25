import { Router } from "express";
import upload from "../middleware/upload";
import {
  createGameMemory,
  listUserGames,
  listUploadedImages,
} from "../controller/gameMemoryController";

const router = Router();

// Rota para criar um jogo de memória com upload de imagem
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  createGameMemory
);

router.get("/", listUserGames);
router.get("/images", listUploadedImages);

export default router;
