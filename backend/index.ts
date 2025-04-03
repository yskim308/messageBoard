import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
app.use(cors());
const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello from the backend? succesfully sent a response...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
