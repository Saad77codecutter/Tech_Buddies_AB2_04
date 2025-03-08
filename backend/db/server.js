import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let pool;

// Initialize PostgreSQL connection
const initDB = async () => {
  const pg = await import("pg");
  const { Pool } = pg.default;
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
};

await initDB();

/**
 * Store video details (data from frontend)
 */
app.post("/videos", async (req, res) => {
  const { video_name, status } = req.body;

  if (!video_name || !status) {
    return res.status(400).json({ error: "Missing video_name or status" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO video_storage (video_name, status) VALUES ($1, $2) RETURNING *",
      [video_name, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting video:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Store email (data from frontend)
 */
app.post("/emails", async (req, res) => {
  const { email_id, email_body, email_timestamp, status } = req.body;

  if (!email_id || !email_body || !status) {
    return res.status(400).json({ error: "Missing email_id, email_body, or status" });
  }

  try {
    const result = await pool.query(
     `INSERT INTO emails (email_id, email_body, email_timestamp, status)
     VALUES ($1, $2, NOW(), $3)
     RETURNING *`,
    [email_id, email_body, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting email:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Fetch all emails
 */
app.get("/emails", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM emails");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Fetch all videos
 */
app.get("/videos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM video_storage");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
