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
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.employee_id,
        })),
        name: "employee_id",
      },
      {
        type: "list",
        message: "What role would you like to assign to the selected employee?",
        choices: roleNames,
        name: "role_title",
      },
    ]);

    const { role_title } = answer;
    const selectedEmployeeId = answer.employee_id;
    const role_id = roleIDs[role_title];

    const sql = `UPDATE employees SET role_id = $1 WHERE employee_id = $2;`;
    const params = [role_id, selectedEmployeeId];

    console.log(
      "this is my employee ID: " +
        selectedEmployeeId +
        "and i want to change their role to: " +
        role_title +
        role_id
    );

    await modifyTable(sql, params, callback);

    console.log(
      "Updated employee with id: " +
        selectedEmployeeId +
        " to role with id: " +
        role_id +
        " successfully"
    );
  } catch (error) {
    console.error("Error updating employee", error);
  }
}

module.exports = updateEmployee;
