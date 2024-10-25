import { Request, Response } from "express";
import {
  createGameWithMemory,
  getGamesWithMemory,
} from "../model/gameMemoryModel";
import prisma from "../prisma";
import fs from "fs";
import path from "path";

type MulterRequest = Request & {
  files: {
    [fieldname: string]: Express.Multer.File[];
  };
};

export async function createGameMemory(req: Request, res: Response) {
  try {
    const { gameId, playTime, userId } = req.body;

    // Acessa as imagens enviadas pelo Multer
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const mainImage = files["mainImage"]?.[0]?.path;
    const images = files["images"]?.map((file) => file.path);

    if (!mainImage) {
      return res
        .status(400)
        .json({ error: "A imagem principal é obrigatória." });
    }

    // Cria o registro do jogo de memória associado ao jogo
    const gameMemory = await prisma.gameMemory.create({
      data: {
        playTime: Number(playTime),
        userId: Number(userId),
        mainImage,
        images,
        gameId: Number(gameId), // Relaciona com o jogo
      },
    });

    res.status(201).json(gameMemory);
  } catch (error) {
    console.error("Erro ao criar jogo de memória:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function addGameMemory(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, playTime, images, userId } = req.body;
    const mainImage = req.file?.path;

    if (!mainImage) {
      res.status(400).json({ error: "Main image is required" });
      return; // Termina a função aqui para evitar problemas de tipo
    }

    const game = await createGameWithMemory(
      userId,
      name,
      playTime,
      mainImage,
      images
    );
    res.status(201).json(game); // Não há necessidade de retornar nada
  } catch (error) {
    console.error("Erro ao criar jogo de memória:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function listUserGames(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    const games = await getGamesWithMemory(userId);
    res.status(200).json(games);
  } catch (error) {
    console.error("Erro ao listar jogos de memória:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function listUploadedImages(req: Request, res: Response) {
  try {
    const directoryPath = path.join(__dirname, "../../uploads");
    fs.readdir(
      directoryPath,
      (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
          return res.status(500).json({ error: "Unable to scan directory" });
        }
        const imageUrls = files.map(
          (file) => `http://localhost:3000/uploads/${file}`
        );
        res.status(200).json(imageUrls);
      }
    );
  } catch (error) {
    console.error("Error listing images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
