const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
let db;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.post("/contacts", async (req, res) => {
  const { name, email, mobile } = req.body;
  const [results] = await db.query(
    `INSERT INTO contacts(Name,Email,Mobile) VALUES ("${name}","${email}","${Number(
      mobile
    )}")`
  );
  if (results) {
    res.status(200).json(`${results.insertID}`);
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
  const id = req.params;
  const [results] = await db.query(`SELECT * FROM contacts WHERE Sr=?;`, [id]);
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
    password: "ambujmysql",
    database: "contact_db",
  })
  .then((connection) => {
    db = connection;
    app.listen(3000, () => {
      console.log("Connected ohhhh");
    });
  });
