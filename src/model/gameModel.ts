import prisma from "../prisma";

export async function createGame(userId: number, name: string) {
  return await prisma.game.create({
    data: {
      name,
      userId,
    },
  });
}

export async function getUserGames(userId: number) {
  return await prisma.game.findMany({
    where: { userId },
  });
}
