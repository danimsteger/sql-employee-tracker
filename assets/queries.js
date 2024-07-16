const express = require("express");

const { Pool } = require("pg");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
