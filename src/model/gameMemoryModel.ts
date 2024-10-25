import prisma from "../prisma";

export async function createGameWithMemory(
  userId: number,
  name: string,
  playTime: number,
  mainImage: string,
  images: string[]
) {
  const game = await prisma.game.create({
    data: {
      name,
      userId,
      gameMemory: {
        create: {
          playTime,
          mainImage,
          images,
        },
      },
    },
    include: {
      gameMemory: true,
    },
  });

  return game;
}

export async function getGamesWithMemory(userId: number) {
  return await prisma.game.findMany({
    where: { userId },
    include: { gameMemory: true },
  });
}
