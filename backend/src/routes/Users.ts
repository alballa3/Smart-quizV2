import { Router } from "express";
import { z } from "zod";
import { login, register } from "../controller/userController";

const UsersRoute = Router();

// POST /api/users/register
UsersRoute.post("/register", register);

UsersRoute.post("/login", login);
export default UsersRoute;
