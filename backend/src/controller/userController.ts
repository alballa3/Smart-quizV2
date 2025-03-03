import type { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import mongoose, { Mongoose, MongooseError } from "mongoose";
const generateToken = (playload: object, expiresIn: string | number) => {
  const sercet = process.env.JWT_SECRET;
  if (!sercet) {
    throw new Error(
      "YOU MUST TO HAVE AN JWT SECRET ENV VARIABLE TO GENERATE JWT TOKENS!  IT SHOULD BE SET AS A SECRET IN YOUR ENVIRONMENT.  USE 'openssl rand -hex 32' TO GENER"
    );
  }
  return jwt.sign(playload, sercet, {
    expiresIn: expiresIn || "1d",
  });
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  // Vaildtion
  const vaildtion = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(3),
    role: z.string().min(3),
  });
  const validationResult = vaildtion.safeParse(req.body);
  if (!validationResult.success) {
    res
      .status(400)
      .json({ error: validationResult.error.flatten().fieldErrors });
    return;
  }
  // CREATE TOKEN AND STORE IT
  const exportAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const token = generateToken({ email, name }, exportAt);

  // Store user to DB
  try {
    const User = await userModel.create({
      email,
      password,
      name,
      role,
      sessions: [
        {
          token,
          exportAt: exportAt,
          userAgent: req.headers["user-agent"],
        },
      ],
    });
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(exportAt),
    });
    User.save();
    res.status(201).json({ message: "User created", user: User });
  } catch (error) {
    if ((error as any).code == 11000) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    res.status(500).json({ error: "Internal Server Error", message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Vaildtion
  const vaildtion = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const validationResult = vaildtion.safeParse(req.body);
  if (!validationResult.success) {
    res
      .status(400)
      .json({ error: validationResult.error.flatten().fieldErrors });
    return;
  }
 
}