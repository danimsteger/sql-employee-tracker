// Import packages
const inquirer = require("inquirer");
const colors = require("colors");
const consoleTable = require("console.table");

// Import functions
const { displayTable } = require("./assets/queries");
const addDept = require("./assets/add/addDept.js");
const addRole = require("./assets/add/addRole.js");
const addEmployee = require("./assets/add/addEmployee.js");
const roleUpdate = require("./assets/update/roleUpdate.js");
const managerUpdate = require("./assets/update/managerUpdate.js");
const deleteDept = require("./assets/delete/deleteDept.js");
const deleteEmployee = require("./assets/delete/deleteEmployee.js");
const deleteRole = require("./assets/delete/deleteRole.js");

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
          colors.magenta("View All Roles"),
          colors.magenta("View All Employees"),
          colors.magenta("View All Employees by Manager"),
          colors.magenta("View All Employees by Department"),
          colors.magenta("View Department Salary Information"),
          colors.green("Add A Department"),
          colors.green("Add a Role"),
          colors.green("Add an Employee"),
          colors.cyan("Update an Employee's Role"),
          colors.cyan("Update an Employee's Manager"),
          colors.red("Delete a Department"),
          colors.red("Delete a Role"),
          colors.red("Delete an Employee"),
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
      else if (toDo === colors.magenta("View All Roles")) {
        const query =
          'SELECT roles.role_id AS "ID", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY" FROM roles JOIN departments ON roles.dept_id = departments.dept_id ORDER BY role_id;';
        displayTable(query, promptUser);
      }

      // View employees
      else if (toDo === colors.magenta("View All Employees")) {
        const query = `SELECT e.employee_id AS "ID", e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY", CASE 
        WHEN m.first_name IS NULL AND m.last_name IS NULL THEN 'null'
        ELSE CONCAT(COALESCE(m.first_name, ''), ' ', COALESCE(m.last_name, ''))
    END AS "MANAGER" FROM employees e JOIN roles ON e.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id LEFT JOIN employees m ON e.manager_id = m.employee_id ORDER BY e.employee_id;`;
        displayTable(query, promptUser);
      }

      // Add a department
      else if (toDo === colors.green("Add A Department")) {
        addDept(promptUser);
      }

      // Add a role
      else if (toDo === colors.green("Add a Role")) {
        addRole(promptUser);
      }

      // Add an employee
      else if (toDo === colors.green("Add an Employee")) {
        addEmployee(promptUser);
      }

      // Update an exisiting employee's role
      else if (toDo === colors.cyan("Update an Employee's Role")) {
        roleUpdate(promptUser);
      }

      // Update an existing employee's manager
      else if (toDo === colors.cyan("Update an Employee's Manager")) {
        managerUpdate(promptUser);
      }

      // View all employees sorted by manager
      else if (toDo === colors.magenta("View All Employees by Manager")) {
        const query = `SELECT  CONCAT(e.first_name, ' ', e.last_name) AS "EMPLOYEE", CASE 
        WHEN m.first_name IS NULL AND m.last_name IS NULL THEN 'null'
        ELSE CONCAT(COALESCE(m.first_name, ''), ' ', COALESCE(m.last_name, ''))
    END AS "MANAGER" FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id ORDER BY e.manager_id, e.first_name;`;
        displayTable(query, promptUser);
      }

      // View all employees sorted by dept
      else if (toDo === colors.magenta("View All Employees by Department")) {
        const query = `SELECT CONCAT(e.first_name, ' ', e.last_name) AS "EMPLOYEE", departments.dept_name AS "DEPARTMENT" FROM employees e JOIN roles ON e.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id ORDER BY departments.dept_name, e.first_name;`;
        displayTable(query, promptUser);
      }

      // Delete a department
      else if (toDo === colors.red("Delete a Department")) {
        deleteDept(promptUser);
      }

      // Delete a role
      else if (toDo === colors.red("Delete a Role")) {
        deleteRole(promptUser);
      }

      // Delete an employee
      else if (toDo === colors.red("Delete an Employee")) {
        deleteEmployee(promptUser);
      }

      // View salary information by department
      else if (toDo === colors.magenta("View Department Salary Information")) {
        const query = `SELECT departments.dept_name AS "DEPARTMENT", COUNT(employees.employee_id) AS "NUMBER OF EMPLOYEES", SUM(role_salary) AS "TOTAL SALARY", AVG(roles.role_salary) AS "AVERAGE SALARY" FROM roles JOIN departments ON roles.dept_id = departments.dept_id JOIN employees ON roles.role_id = employees.role_id GROUP BY departments.dept_name;`;
        displayTable(query, promptUser);
      }
    });
}

promptUser();
