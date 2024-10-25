import { Request, Response } from "express";
import { createGame, getUserGames } from "../model/gameModel";
import fs from "fs";
import path from "path";

export async function addGame(req: Request, res: Response) {
  try {
    const { name, userId } = req.body; // Agora o userId é passado diretamente no corpo

    const game = await createGame(userId, name);
    res.status(201).json(game);
  } catch (error) {
    console.error("Erro ao criar jogo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function listUserGames(req: Request, res: Response) {
  try {
    const { userId } = req.body; // Também passa o userId no corpo

    const games = await getUserGames(userId);
    res.status(200).json(games);
  } catch (error) {
    console.error("Erro ao listar jogos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
