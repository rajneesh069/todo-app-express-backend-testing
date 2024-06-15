import express from "express";
import cors from "cors";
import userRouter from "./routes/user";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
