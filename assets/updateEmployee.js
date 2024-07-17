const inquirer = require("inquirer");
const colors = require("colors");
const { getRoles } = require("./addEmployee");

const { modifyTable } = require("./queries");

const pool = require("./db");

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
    const employeeNames = employees.map(
      (employee) => `${employee.first_name} ${employee.last_name}`
    );
    const roles = await getRoles();

    const roleNames = roles.map((role) => role.role_title);

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

    const { role_title, employee_name } = answer;
    const selectedEmployee = employees.find(
      (employee) =>
        `${employee.first_name} ${employee.last_name}` === employee_name
    );
    const selectedEmployeeId = selectedEmployee.employee_id;
    const role_id = roleIDs[role_title];

    const sql = `UPDATE employees SET role_id = $1 WHERE employee_id = $2;`;
    const params = [role_id, selectedEmployeeId];

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
