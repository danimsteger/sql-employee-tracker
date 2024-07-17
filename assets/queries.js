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

function poolQueryDisplay(query, callback) {
  pool.query(query, (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      console.table(res.rows);
    }
    callback();
  });
}

function poolQueryAdd(sql, params, callback) {
  pool.query(sql, params, (err, res) => {
    if (err) {
      console.error("Error executing add:", err);
    } else {
      console.log("Successfully added department!!!!!");
    }
    callback();
  });
}

module.exports = { poolQueryDisplay, poolQueryAdd };
