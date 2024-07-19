// Import packages
const inquirer = require("inquirer");
const colors = require("colors");

// Import query function to modify a table
const { modifyTable, getEmployees } = require("../queries");

async function deleteEmployee(callback) {
  try {
    const employees = await getEmployees();

    const employeeNames = employees.map(
      (employee) => `${employee.first_name} ${employee.last_name}`
    );

    const answer = await inquirer.prompt([
      {
        type: "list",
        message: "Which employee would you like to delete?",
        choices: employeeNames,
        name: "employee_name",
      },
    ]);

    const { employee_name } = answer;

    const selectedEmployee = employees.find(
      (employee) =>
        `${employee.first_name} ${employee.last_name}` === employee_name
    );

    const selectedEmployeeId = selectedEmployee.employee_id;

    const sql = `DELETE FROM employees WHERE employee_id = $1`;
    const params = [selectedEmployeeId];

    await modifyTable(sql, params, callback);
    console.log(
      colors.yellow.bold(employee_name),
      colors.green(" was deleted from employees")
    );
  } catch (error) {
    console.error("Error deleting departmenta:", error);
  }
}

module.exports = deleteEmployee;
