// Connect to database
const { Pool } = require("pg");

// Creates bridge
const pool = new Pool(
  {
    user: "",
    password: "",
    host: "localhost",
    database: "company",
  },
  console.log("Connected to company database.")
);

// Actually connects to database
pool.connect();

module.exports = pool;
