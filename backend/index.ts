import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello from the backend? succesfully sent a response...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
