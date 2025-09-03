const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("CORS");
const morgan = require("morgan");
const app = express();
let db;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.post("/contacts", (req, res) => {
  const { name, email, mobile } = req.body;
  const [results, fields] = db.query("INSERT INTO contacts VALUES (?,?,?)", [
    name,
    email,
    mobile,
  ]);
  if (results) {
    res.status(200).send(`${result.insertID}`);
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
