"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGame = addGame;
exports.listUserGames = listUserGames;
const gameModel_1 = require("../model/gameModel");
function addGame(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            const userId = req.user.id; // Now recognized correctly
            const game = yield (0, gameModel_1.createGame)(userId, name);
            res.status(201).json(game);
        }
        catch (error) {
            console.error("Erro ao criar jogo:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
function listUserGames(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.id; // Assuming the user was authenticated
            const games = yield (0, gameModel_1.getUserGames)(userId);
            res.status(200).json(games);
        }
        catch (error) {
            console.error("Erro ao listar jogos:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
