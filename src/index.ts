import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import todoRouter from "./routes/todo";
import userRouter from "./routes/user";
import { createTables } from "./db/schema";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send({ error: "Route not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.use("/users", userRouter);
app.use("/users", todoRouter);

app.get("/", async (_req: Request, res: Response) => {
  res.send("Working");
});

app.listen(PORT, async () => {
  await createTables();
  console.log(`The server is running at http://localhost:${PORT}`);
});
