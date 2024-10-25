"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gameController_1 = require("../controller/gameController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authenticateToken, gameController_1.addGame); // Criar jogo
router.get("/", authMiddleware_1.authenticateToken, gameController_1.listUserGames); // Listar jogos do usuário
exports.default = router;
