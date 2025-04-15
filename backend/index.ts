import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL || "");

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://message-board-beta.vercel.app",
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
const port = 4000;

app.get("/", async (req: Request, res: Response) => {
  const orderBy = req.query.orderBy as "date" | "vote" | undefined;
  try {
    let result;
    if (orderBy === "vote") {
      result = await sql`SELECT * FROM messsages ORDER BY votes DESC`;
    } else {
      result = await sql`SELECT * FROM messages ORDER BY date DESC;`;
    }
    res.json({ data: result });
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send("database query failed");
  }
});

app.put("/submit", async (req: Request, res: Response) => {
  const { author, message } = req.body;
  try {
    await sql`INSERT INTO messages (author, message) VALUES (${author}, ${message})`;
    res.status(201).send("message created");
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send("database insert failed");
  }
});

app.post("/vote", async (req: Request, res: Response) => {
  const { isUp, id } = req.body;
  try {
    if (isUp) {
      await sql`UPDATE messages SET votes = votes + 1 WHERE id = ${id}`;
    } else {
      await sql`UPDATE messages SET votes = votes - 1 WHERE id = ${id}`;
    }
    res.status(201).send("votes updated");
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send("vote update failed");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
