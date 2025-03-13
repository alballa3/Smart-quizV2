import { connectionDB } from "@/lib/mongos";
import userModel from "@/models/user";
import { hashSync } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectionDB();
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

  
  try {
    // Store user to DB
    const hashPassword = hashSync(password, 10);
    const User = await userModel.create({
      email,
      password: hashPassword,
      name,
      role,
    });

    User.save();
    res
      .status(201)
      .json({ message: "Your account has been successfully created!" });
  } catch (error) {
    console.log(error);
    if ((error as any).code == 11000) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    res.status(500).json({ error: "Internal Server Error", message: error });
  }
}
