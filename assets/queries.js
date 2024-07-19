const colors = require("colors");
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
      console.error("Error modifying table", err);
    } else {
      console.log(colors.blue("~ The table was successfully updated ~"));
    }
    callback();
  });
}

// Get current list of employees
async function getEmployees() {
  try {
    const result = await pool.query(
      `SELECT * FROM employees ORDER BY employee_id`
    );
    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

// Get current list of departments
async function getDepts() {
  try {
    const result = await pool.query(
      `SELECT * FROM departments ORDER BY dept_id`
    );
    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

// Get current list of roles
async function getRoles() {
  try {
    const result = await pool.query(`SELECT * FROM roles ORDER BY role_id`);
    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

module.exports = {
  displayTable,
  modifyTable,
  getEmployees,
  getDepts,
  getRoles,
};
