// Import packages
const inquirer = require("inquirer");
const colors = require("colors");

// Import query function to modify a table
const { modifyTable, getRoles, getEmployees } = require("./queries");

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

    const employees = await getEmployees();

    // Creates array of all employees listed with their first and last names
    const employeeNames = employees.map(
      (employee) => `${employee.first_name} ${employee.last_name}`
    );

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
      {
        type: "list",
        message: "Who is the employee's manager?",
        choices: employeeNames,
        name: "manager_name",
      },
    ]);

    // Gathers results from prompts
    const { first_name, last_name, role_title, manager_name } = answer;
    const role_id = roleIDs[role_title];

    const selectedManager = employees.find(
      (employee) =>
        `${employee.first_name} ${employee.last_name}` === manager_name
    );

    const selectedManagerId = selectedManager.employee_id;

    // SQL syntax to add a row to employees table
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
    const params = [first_name, last_name, role_id, selectedManagerId];

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

module.exports = addEmployee;
