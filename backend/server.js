const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost", // Update with your DB host
  user: "root", // Update with your DB user
  password: "", // Update with your DB password
  database: "qr_scanner_db", // Update with your DB name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MariaDB!");
});

// Example API to fetch model URLs by QR code ID
app.get("/model/:id", (req, res) => {
  const qrId = req.params.id;
  db.query("SELECT model_url FROM models WHERE id = ?", [qrId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }
    if (results.length > 0) {
      res.json({ modelUrl: results[0].model_url });
    } else {
      res.status(404).send("Model not found");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
