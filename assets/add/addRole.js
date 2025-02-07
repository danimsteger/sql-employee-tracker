// Import packages
const inquirer = require("inquirer");
const colors = require("colors");

// Import query function to modify a table and get list of departments
const { modifyTable, getDepts } = require("../queries");

async function addRole(callback) {
  try {
    const departments = await getDepts();

    // Creates array of just deparment names
    const departmentNames = departments.map(
      (department) => department.dept_name
    );

    // Creates an object of key value pairs of 'dept_names': dept_id
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

    // Gathers results from prompts
    const { role_title, role_salary, dept_name } = answer;

    // Gets the id of the selected department
    const dept_id = departmentIDs[dept_name];

    // SQL syntax to add a row to the roles table
    const sql = `INSERT INTO roles (role_title, role_salary, dept_id) VALUES ($1, $2, $3)`;
    const params = [role_title, role_salary, dept_id];

    // Query with SQL syntax
    await modifyTable(sql, params, callback);

    console.log(
      colors.yellow.bold(role_title),
      colors.green(" was added to roles.")
    );
  } catch (error) {
    console.error("Error adding role", error);
  }
}

module.exports = addRole;
