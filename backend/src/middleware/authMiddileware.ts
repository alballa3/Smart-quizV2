import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export async function guestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  const verfy = jwt.verify(token, process.env.JWT_SECRET as string);
  if (token && verfy) {
    res.json({
      message:
        "You do not have permission to access this area. This section is for guests only. Please log out to continue.",
    });
    return;
  }
  next();
}
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  const verfy = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!token && !verfy) {
    res.json({
      message:
        "You must be logged in to access this page. Please sign in to continue.",
    });
    return;
  }
  next();
}
