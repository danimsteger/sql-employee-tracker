const inquirer = require("inquirer");
const colors = require("colors");

const { modifyTable } = require("./queries");
const pool = require("./db");

async function getRoles() {
  try {
    const result = await pool.query(`SELECT * FROM roles`);
    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

async function addEmployee(callback) {
  try {
    const roles = await getRoles();

    const roleNames = roles.map((role) => role.role_title);

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

    const { first_name, last_name, role_title } = answer;
    const role_id = roleIDs[role_title];

    const sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)`;
    const params = [first_name, last_name, role_id];

    console.log(
      "This is my employee name:" +
        first_name +
        last_name +
        " And this is my role id " +
        role_id
    );

    await modifyTable(sql, params, callback);

    console.log("Added " + first_name + last_name + " to the database");
  } catch (error) {
    console.error("Error adding employee", error);
  }
}

module.exports = { addEmployee, getRoles };
