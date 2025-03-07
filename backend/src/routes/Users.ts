import { Router } from "express";
import { z } from "zod";
import { login, logout, register, session } from "../controller/userController";
import { authMiddleware, guestMiddleware } from "../middleware/authMiddileware";

const UsersRoute = Router();

// POST /api/users/register
UsersRoute.post("/register", guestMiddleware, register);

// POST /api/users/login
UsersRoute.post("/login", guestMiddleware, login);

// GET /api/users/session

UsersRoute.get("/session", authMiddleware, session);

// DELETE /api/users/logout

UsersRoute.delete("/logout", authMiddleware, logout);

export default UsersRoute;
