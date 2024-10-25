import prisma from "../prisma";

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  return await prisma.user.create({
    data: { name, email, password },
  });
}

export async function allUsers() {
  return await prisma.user.findMany();
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
