import { Router } from "express";
import { z } from "zod";
import { login, register, session } from "../controller/userController";
import { authMiddleware, guestMiddleware } from "../middleware/authMiddileware";

const UsersRoute = Router();

// POST /api/users/register
UsersRoute.post("/register", guestMiddleware,register);

 
// POST /api/users/login
UsersRoute.post("/login", guestMiddleware,login);

// GET /api/users/session 

UsersRoute.get("/session", session);

export default UsersRoute;
