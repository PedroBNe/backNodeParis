import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, allUsers } from "../model/userModel";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await allUsers();

    const usersData = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));

    res.status(200).json(usersData);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
