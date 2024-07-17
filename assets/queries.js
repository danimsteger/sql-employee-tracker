const pool = require("./db");

// Display Query
function displayTable(query, callback) {
  pool.query(query, (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      console.table(res.rows);
    }
    callback();
  });
}

// Modify an existing table by adding or updating
function modifyTable(sql, params, callback) {
  pool.query(sql, params, (err, res) => {
    if (err) {
      console.error("Error executing add:", err);
    } else {
      console.log("Successfully added department!!!!!");
    }
    callback();
  });
}

module.exports = { displayTable, modifyTable };
