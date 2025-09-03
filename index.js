const mysql = require("mysql2/promise");
const express = require("express");
const app = express();
let db;

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
