import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";

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

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || "5432"),
});

app.get("/", async (req: Request, res: Response) => {
  const orderBy = req.query.orderBy as "date" | "vote" | undefined;
  let query: string;
  if (orderBy === "vote") {
    query = "SELECT * FROM messages ORDER BY votes DESC;";
  } else {
    query = "SELECT * FROM messages ORDER BY date DESC;";
  }
  try {
    const result = await pool.query(query);
    res.json({ data: result.rows });
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send("Database query failed");
  }
});

app.put("/submit", async (req: Request, res: Response) => {
  const { author, message } = req.body;
  const query: string =
    "INSERT INTO messages (author, message) VALUES ($1, $2)";
  try {
    await pool.query(query, [author, message]);
    res.status(201).send("message created");
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send("database insert failed");
  }
});

app.post("/vote", async (req: Request, res: Response) => {
  const { isUp, id } = req.body;
  let query: string;
  if (isUp) {
    query = "UPDATE messages SET votes = votes + 1 WHERE id = $1";
  } else {
    query = "UPDATE messages SET votes = votes - 1 WHERE id = $1";
  }

  try {
    await pool.query(query, [id]);
    res.status(201).send("votes updated");
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send("vote update failed");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
