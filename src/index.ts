import express from "express";
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

app.use("/users", userRouter);
app.use("/users", todoRouter);

createTables()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
