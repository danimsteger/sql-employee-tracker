// Import packages
const inquirer = require("inquirer");
const colors = require("colors");

// Import functions to gather roles and modify table
const { modifyTable, getEmployees } = require("../queries");

async function managerUpdate(callback) {
  try {
    const employees = await getEmployees();

    // Creates array of all employees listed with their first and last names
    const employeeNames = employees.map(
      (employee) => `${employee.first_name} ${employee.last_name}`
    );

    const answer = await inquirer.prompt([
      {
        type: "list",
        message: "Which employee's manager did you want to update?",
        choices: employeeNames,
        name: "employee_name",
      },
      {
        type: "list",
        message: "What is the employee's new manager?",
        choices: employeeNames,
        name: "manager_name",
      },
    ]);

    // Gathers results from prompts
    const { employee_name, manager_name } = answer;

    // Finds the selected employee in the employees array
    const selectedEmployee = employees.find(
      (employee) =>
        `${employee.first_name} ${employee.last_name}` === employee_name
    );

    // Gets the id of the selected employee
    const selectedEmployeeId = selectedEmployee.employee_id;

    // Finds the selected manager in the employees array
    const selectedManager = employees.find(
      (employee) =>
        `${employee.first_name} ${employee.last_name}` === manager_name
    );

    // Gets the employee id of the selected manager
    const selectedManagerId = selectedManager.employee_id;

    // SQL syntax to update a row in the employees table
    const sql = `UPDATE employees SET manager_id = $1 WHERE employee_id = $2;`;
    const params = [selectedManagerId, selectedEmployeeId];

    // Query with SQL syntax
    await modifyTable(sql, params, callback);

    console.log(
      colors.yellow.bold(employee_name + "'s"),
      colors.green(" manager was updated to "),
      colors.yellow.bold(manager_name)
    );
  } catch (error) {
    console.error("Error updating employee manager", error);
  }
}

module.exports = managerUpdate;
