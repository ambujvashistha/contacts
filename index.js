const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const process = require("process");
const multer = require("multer");
const mimetype = require("mimetype");

require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage });
let db;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.post("/contacts", upload.single("photo"), async (req, res) => {
  const { name, email, mobile } = req.body;
  const { photo } = req.file ? req.file.buffer : null;
  const mimetype = req.file ? req.file.mimetype : null;
  await db.query(
    `INSERT INTO contacts(Name,Email,Mobile,Photo) VALUES ("${name}","${email}","${Number(
      mobile
    )}","${photo}")`
  );
  const [results] = await db.query("SELECT * FROM contacts");
  if (results) {
    res.status(200).json(results);
  } else {
    res.send(500).send("Internal Server Error");
  }
});

app.get("/contacts", async (req, res) => {
  const [results] = await db.query("SELECT * FROM contacts");
  if (results) {
    res.status(200).json(results);
  } else {
    res.send(500).send("Internal Server Error");
  }
});

app.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const [results] = await db.query(`SELECT * FROM contacts WHERE Sr=?;`, [id]);
  if (results) {
    res.status(200).json(results);
  } else {
    res.send(500).send("Internal Server Error");
  }
});

app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM contacts WHERE Sr=?;", [id]);
  const [results] = await db.query("SELECT * FROM contacts");
  if (results) {
    res.status(200).json(results);
  } else {
    res.send(500).send("Internal Server Error");
  }
});

mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_Password,
    database: "contact_db",
  })
  .then((connection) => {
    db = connection;
    app.listen(3000, () => {
      console.log("Connected ohhhh");
    });
  });
