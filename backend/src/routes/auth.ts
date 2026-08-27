import bcrypt from "bcryptjs";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

export const authRouter = Router();

function signToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

authRouter.post("/signup", async (req, res) => {
  const { loginId, name, password } = req.body as {
    loginId?: string;
    name?: string;
    password?: string;
  };

  if (!loginId || !name || !password) {
    res.status(400).json({ message: "loginId, name, password are required" });
    return;
  }

  const existing = await prisma.user.findUnique({ where: { loginId } });
  if (existing) {
    res.status(409).json({ message: "이미 사용 중인 ID입니다" });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { loginId, name, password: hashed },
  });

  const token = signToken(user.id);
  res.status(201).json({
    token,
    user: { id: user.id, loginId: user.loginId, name: user.name },
  });
});

authRouter.post("/login", async (req, res) => {
  const { loginId, password } = req.body as { loginId?: string; password?: string };

  if (!loginId || !password) {
    res.status(400).json({ message: "loginId, password are required" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { loginId } });
  if (!user) {
    res.status(401).json({ message: "ID 또는 비밀번호가 올바르지 않습니다" });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ message: "ID 또는 비밀번호가 올바르지 않습니다" });
    return;
  }

  const token = signToken(user.id);
  res.json({
    token,
    user: { id: user.id, loginId: user.loginId, name: user.name },
  });
});

authRouter.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId! } });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({ user: { id: user.id, loginId: user.loginId, name: user.name } });
});
