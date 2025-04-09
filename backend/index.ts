import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://message-board-beta.vercel.app/",
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

const dbPath = "./messages.db";
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to sqllite database");
  }
});

app.get("/", (req: Request, res: Response) => {
  const orderBy = req.query.orderBy as "date" | "vote" | undefined;
  let query: string;
  if (orderBy === "vote") {
    query = "SELECT * FROM messages ORDER BY votes DESC;";
  } else {
    query = "SELECT * FROM messages ORDER BY date DESC;";
  }

  db.all(`${query}`, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500);
    } else {
      res.json({ data: rows });
    }
  });
});

app.put("/submit", (req: Request, res: Response) => {
  const { author, message } = req.body;
  const query: string = "INSERT INTO messages (author, message) VALUES (?, ?)";
  db.run(query, [author, message], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("DB insert failed");
    } else {
      res.status(201).send("created");
    }
  });
});

app.post("/vote", (req: Request, res: Response) => {
  const { isUp, id } = req.body;
  const voteString: string = isUp ? "votes + 1" : "votes - 1";
  let query: string;
  if (isUp) {
    query = "UPDATE messages SET votes = votes + 1 WHERE id = ?";
  } else {
    query = "UPDATE messages SET votes = votes - 1 WHERE id = ?";
  }
  db.run(query, [id], (err) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("DB update failed");
    } else {
      return res.status(201).send("votes updated");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
