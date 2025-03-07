import type { Request, Response } from "express";
import { any, z } from "zod";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import mongoose, { Mongoose, MongooseError } from "mongoose";
const generateToken = (playload: object) => {
  const sercet = process.env.JWT_SECRET;
  if (!sercet) {
    throw new Error(
      "YOU MUST TO HAVE AN JWT SECRET ENV VARIABLE TO GENERATE JWT TOKENS!  IT SHOULD BE SET AS A SECRET IN YOUR ENVIRONMENT.  USE 'openssl rand -hex 32' TO GENER"
    );
  }
  return jwt.sign(playload, sercet, {
    expiresIn: "30d",
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
  const token = generateToken({ email, name });

  // Store user to DB
  try {
    const User = await userModel.create({
      email,
      password: Bun.password.hashSync(password),
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
    res
      .status(201)
      .json({ message: "Your account has been successfully created!" });
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
  const check = (await userModel.findOne({ email: email })) as any;
  console.log(check);
  if (!check || !check.comparePassword(password)) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const token = generateToken({
    email,
    name: check.name,
  });
  const exportAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const updateToken = await userModel.findOneAndUpdate(
    {
      email: email,
    },
    {
      $push: {
        sessions: {
          token: token,
          exportAt: exportAt,
          userAgent: req.headers["user-agent"],
        },
      },
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(exportAt),
  });
  res.json({ message: "Login has be successfull " });
};

export const session = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const decode = jwt.decode(token);
  res.status(200).json({ session: decode });
};
export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const decodeToken = jwt.decode(token) as Record<string, any>;
  const user = await userModel.findOneAndUpdate(
    {
      email: decodeToken?.email,
    },
    {
      $pull: {
        sessions: {
          token,
        },
      },
    },
    {
      new: true,
    }
  );
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
  });

  res.json({ message: "You have been logged out successfully." });
};
