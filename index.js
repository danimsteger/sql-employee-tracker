// Import packages
const inquirer = require("inquirer");
const colors = require("colors");
const consoleTable = require("console.table");

// Import functions
const { displayTable } = require("./assets/queries");
const addDept = require("./assets/addDept.js");
const addRole = require("./assets/addRole");
const addEmployee = require("./assets/addEmployee");
const roleUpdate = require("./assets/roleUpdate.js");
const managerUpdate = require("./assets/managerUpdate.js");
const deleteItem = require("./assets/delete.js");

// Main prompt
function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "toDo",
        choices: [
          colors.magenta("View All Departments"),
          colors.red("View All Roles"),
          colors.green("View All Employees"),
          colors.green("View All Employees by Manager"),
          colors.magenta("View All Employees by Department"),
          colors.magenta("Add A Department"),
          colors.red("Add a Role"),
          colors.green("Add an Employee"),
          colors.red("Update an Employee's Role"),
          colors.green("Update an Employee's Manager"),
          colors.magenta("Delete a Department"),
        ],
      },
    ])
    .then((answer) => {
      const { toDo } = answer;

      // View departments
      if (toDo === colors.magenta("View All Departments")) {
        const query =
          'SELECT departments.dept_id as "ID", departments.dept_name as "NAME" FROM departments ORDER BY dept_id;';
        displayTable(query, promptUser);
      }

      // View roles
      else if (toDo === colors.red("View All Roles")) {
        const query =
          'SELECT roles.role_id AS "ID", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY" FROM roles JOIN departments ON roles.dept_id = departments.dept_id ORDER BY role_id;';
        displayTable(query, promptUser);
      }

      // View employees
      else if (toDo === colors.green("View All Employees")) {
        const query = `SELECT e.employee_id AS "ID", e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY", CONCAT(m.first_name, ' ', m.last_name) AS "MANAGER" FROM employees e JOIN roles ON e.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id LEFT JOIN employees m ON e.manager_id = m.employee_id ORDER BY e.employee_id;`;
        displayTable(query, promptUser);
      }

      // Add a department
      else if (toDo === colors.magenta("Add A Department")) {
        addDept(promptUser);
      }

      // Add a role
      else if (toDo === colors.red("Add a Role")) {
        addRole(promptUser);
      }

      // Add an employee
      else if (toDo === colors.green("Add an Employee")) {
        addEmployee(promptUser);
      }

      // Update an exisiting employee's role
      else if (toDo === colors.red("Update an Employee's Role")) {
        roleUpdate(promptUser);
      }

      // Update an existing employee's manager
      else if (toDo === colors.green("Update an Employee's Manager")) {
        managerUpdate(promptUser);
      }

      // View all employees sorted by manager
      else if (toDo === colors.green("View All Employees by Manager")) {
        const query = `SELECT  CONCAT(e.first_name, ' ', e.last_name) AS "EMPLOYEE", CONCAT(m.first_name, ' ', m.last_name) AS "MANAGER" FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id ORDER BY e.manager_id, e.first_name;`;
        displayTable(query, promptUser);
      }

      // View all employees sorted by dept
      else if (toDo === colors.magenta("View All Employees by Department")) {
        const query = `SELECT CONCAT(e.first_name, ' ', e.last_name) AS "EMPLOYEE", departments.dept_name AS "DEPARTMENT" FROM employees e JOIN roles ON e.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id ORDER BY departments.dept_name, e.first_name;`;
        displayTable(query, promptUser);
      } else if (toDo === colors.magenta("Delete a Department")) {
        deleteItem(promptUser);
      }
    });
}

promptUser();
