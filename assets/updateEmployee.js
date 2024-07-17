// Import packages
const inquirer = require("inquirer");
const colors = require("colors");

// Import functions to gather roles and modify table
const { getRoles } = require("./addEmployee");
const { modifyTable } = require("./queries");

// Import database connection
const pool = require("./db");

// Get current list of employees
async function getEmployees() {
  try {
    const result = await pool.query(`SELECT * FROM employees`);
    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

async function updateEmployee(callback) {
  try {
    const employees = await getEmployees();

    // Creates array of all employees listed with their first and last names
    const employeeNames = employees.map(
      (employee) => `${employee.first_name} ${employee.last_name}`
    );

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
        type: "list",
        message: "Which employee's role did you want to update?",
        choices: employeeNames,
        name: "employee_name",
      },
      {
        type: "list",
        message: "What role would you like to assign to the selected employee?",
        choices: roleNames,
        name: "role_title",
      },
    ]);

    // Gathers results from prompts
    const { role_title, employee_name } = answer;

    // Finds the selected employee in the employees array
    const selectedEmployee = employees.find(
      (employee) =>
        `${employee.first_name} ${employee.last_name}` === employee_name
    );

    // Gets the id of the selected employee
    const selectedEmployeeId = selectedEmployee.employee_id;

    // Gets the id of the selected role
    const role_id = roleIDs[role_title];

    // SQL syntax to update a row in the employees table
    const sql = `UPDATE employees SET role_id = $1 WHERE employee_id = $2;`;
    const params = [role_id, selectedEmployeeId];

    // Query with SQL syntax
    await modifyTable(sql, params, callback);

    console.log(
      colors.yellow.bold(employee_name + "'s"),
      colors.green(" role was updated to "),
      colors.yellow.bold(role_title)
    );
  } catch (error) {
    console.error("Error updating employee", error);
  }
}

module.exports = updateEmployee;
