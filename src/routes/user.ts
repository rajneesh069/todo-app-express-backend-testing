import { Request, Response, Router } from "express";
import { getUser, insertIntoUsersTable } from "../db/queries";
import { User } from "../types";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: User = await insertIntoUsersTable(email, password);
    if (user) {
      return res
        .status(200)
        .json({ user, message: "User created successfully" });
    }
    return res.status(400).json({ message: "Can't create user." });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: User | null = await getUser(email, password);
    if (user) {
      return res.status(200).json({ message: "User signed in", user });
    }
    return res.status(404).json({ message: "Can't find user." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
