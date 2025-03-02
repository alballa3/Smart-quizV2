import { Router } from "express";
import { z } from "zod";

const UsersRoute = Router();

// TOKEN GENERTATE 

const generateToken = () => {
    
};


// POST /api/users/register
UsersRoute.post("/register", (req, res) => {
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
    res.status(400).json({ error: validationResult.error.flatten().fieldErrors });
    return;
  }
    // CREATE TOKEN AND STORE IT 

    res.json({ message: "User Created" });

});

export default UsersRoute;
