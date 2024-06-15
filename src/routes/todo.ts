import { Request, Response, Router } from "express";
import {
  deleteTodos,
  getTodo,
  getTodos,
  insertIntoTodosTable,
} from "../db/queries";

const router = Router();

router.get("/:userId/todos", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const todos = await getTodos(parseInt(userId));
    if (todos) return res.json({ todos, message: "Todos found." }).status(200);
    return res.json({ message: "No todos found" }).status(404);
  } catch (error) {
    console.error(error);
    return res.json({ message: error }).status(500);
  }
});

router.get("/:userId/todo/:todoId", async (req: Request, res: Response) => {
  const { userId, todoId } = req.params;
  try {
    const todo = await getTodo(parseInt(userId), parseInt(todoId));
    if (todo) return res.status(200).json({ todo, message: "Todo found." });
    return res.status(404).json({ message: "No todo found." });
  } catch (error) {
    console.error(error);
    return res.json({ message: error }).status(500);
  }
});

router.post("/:userId/todo", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { userId } = req.params;
  try {
    const isTodoInserted = await insertIntoTodosTable(
      title,
      description,
      parseInt(userId)
    );
    if (isTodoInserted)
      return res.status(200).json({ message: "Todo inserted." });
    return res.status(400).json({ message: "Failed to add todo" });
  } catch (error) {
    console.error(error);
    return res.json({ error }).status(500);
  }
});

router.delete("/:userId/todo/:todoId", async (req: Request, res: Response) => {
  const { userId, todoId } = req.params;
  try {
    const isTodoDeleted = await deleteTodos(parseInt(userId), parseInt(todoId));
    if (isTodoDeleted) {
      return res.json({ message: "Todo deleted successfully" }).status(200);
    }
    return res.json({ message: "Can't delete todo" }).status(400);
  } catch (error) {
    console.error(error);
    return res.json({ error }).status(500);
  }
});

export default router;
