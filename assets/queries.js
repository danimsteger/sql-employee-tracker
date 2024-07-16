// const express = require("express");

// const { Pool } = require("pg");

// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// const pool = new Pool(
//   {
//     user: "",
//     password: "",
//     host: "localhost",
//     database: "company",
//   },
//   console.log("Connected to company database.")
// );

// pool.connect();

const { Pool } = require("pg");
const pool = new Pool(
  {
    user: "",
    password: "",
    host: "localhost",
    database: "company",
  },
  console.log("Connected to company database.")
);

pool.connect();

function poolQuery(query, callback) {
  pool.query(query, (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      console.table(res.rows);
    }
    callback();
  });
}

module.exports = poolQuery;
