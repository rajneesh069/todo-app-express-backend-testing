import { Request, Response, Router } from "express";
import {
  deleteTodos,
  getTodo,
  getTodos,
  insertIntoTodosTable,
} from "../db/queries";
import { Todo } from "../types";

const router = Router();

router.get("/:userId/todos", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const todos: Todo[] | null = await getTodos(parseInt(userId));
    if (todos) return res.status(200).json({ todos, message: "Todos found." });
    return res.status(404).json({ message: "No todos found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
});

router.get("/:userId/todos/:todoId", async (req: Request, res: Response) => {
  const { userId, todoId } = req.params;
  try {
    const todo: Todo = await getTodo(parseInt(userId), parseInt(todoId));
    if (todo) return res.status(200).json({ todo, message: "Todo found." });
    return res.status(404).json({ message: "No todo found." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
});

router.post("/:userId/todo", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { userId } = req.params;
  try {
    const todo: Todo = await insertIntoTodosTable(
      title,
      description,
      parseInt(userId)
    );
    if (todo) return res.status(200).json({ message: "Todo inserted.", todo });
    return res.status(400).json({ message: "Failed to add todo" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

router.delete("/:userId/todos/:todoId", async (req: Request, res: Response) => {
  const { userId, todoId } = req.params;
  console.log(parseInt(userId), parseInt(todoId));
  try {
    const deletedTodo: Todo = await deleteTodos(
      parseInt(userId),
      parseInt(todoId)
    );
    if (deletedTodo) {
      return res
        .status(200)
        .json({ message: "Todo deleted successfully", deletedTodo });
    }
    return res.status(400).json({ message: "Can't delete todo" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

export default router;
