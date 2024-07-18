// Import packages
const inquirer = require("inquirer");
const colors = require("colors");

// Import query function to modify a table
const { modifyTable } = require("./queries");

// Import database connection
const pool = require("./db");

// Get current list of roles
async function getRoles() {
  try {
    const result = await pool.query(`SELECT * FROM roles ORDER BY roles_id`);
    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

async function addEmployee(callback) {
  try {
    const roles = await getRoles();

    // Creates array of just role titles
    const roleNames = roles.map((role) => role.role_title);

    // Creates an object of key value pairs of 'role_title': role_id
    const roleIDs = roles.reduce((acc, role) => {
      acc[role.role_title] = role.role_id;
      return acc;
    }, {});

    const answer = await inquirer.prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        choices: roleNames,
        name: "role_title",
      },
    ]);

    // Gathers results from prompts
    const { first_name, last_name, role_title } = answer;
    const role_id = roleIDs[role_title];

    // SQL syntax to add a row to employees table
    const sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)`;
    const params = [first_name, last_name, role_id];

    // Query with SQL syntax
    await modifyTable(sql, params, callback);

    console.log(
      colors.yellow.bold(first_name, last_name),
      colors.green(" was added to employees")
    );
  } catch (error) {
    console.error("Error adding employee", error);
  }
}

module.exports = { addEmployee, getRoles };
