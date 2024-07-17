const inquirer = require("inquirer");
const colors = require("colors");

const { modifyTable } = require("./queries");

const pool = require("./db");

async function getDepts() {
  try {
    const result = await pool.query(`SELECT * FROM departments`);
    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

async function addRole(callback) {
  try {
    const departments = await getDepts();

    const departmentNames = departments.map(
      (department) => department.dept_name
    );

    const departmentIDs = departments.reduce((acc, department) => {
      acc[department.dept_name] = department.dept_id;
      return acc;
    }, {});

    const answer = await inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "role_title",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "role_salary",
      },
      {
        type: "list",
        message: "What department does the role belong to?",
        choices: departmentNames,
        name: "dept_name",
      },
    ]);

    const { role_title, role_salary, dept_name } = answer;
    const dept_id = departmentIDs[dept_name];

    const sql = `INSERT INTO roles (role_title, role_salary, dept_id) VALUES ($1, $2, $3)`;
    const params = [role_title, role_salary, dept_id];

    console.log(
      "This is my department name:" +
        dept_name +
        " And this is my department id " +
        dept_id
    );

    await modifyTable(sql, params, callback);

    console.log("Added " + role_title + " to the database");
  } catch (error) {
    console.error("Error adding role", error);
  }
}

module.exports = addRole;
