import { Request, Response, Router } from "express";

const router = Router();

router.get("/todos", async (_req: Request, res: Response) => {
  res.json({message : "Hey"}).status(200);
});

export default router;
