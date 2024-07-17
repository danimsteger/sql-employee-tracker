const inquirer = require("inquirer");
const colors = require("colors");
const consoleTable = require("console.table");
const { poolQueryDisplay } = require("./assets/queries");
const {
  addDept,
  addRole,
  addEmployee,
  updateEmployee,
} = require("./assets/prompts");

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
          colors.magenta("Add A Department"),
          colors.red("Add a Role"),
          colors.green("Add an Employee"),
          colors.red("Update a Role"),
        ],
      },
    ])
    .then((answer) => {
      const { toDo } = answer;
      console.log("Selected Option:", toDo);

      if (toDo === colors.magenta("View All Departments")) {
        const query =
          'SELECT departments.dept_id as "ID", departments.dept_name as "NAME" FROM departments;';
        poolQueryDisplay(query, promptUser);
      } else if (toDo === colors.red("View All Roles")) {
        const query =
          'SELECT roles.role_id AS "ID", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY" FROM roles JOIN departments ON roles.dept_id = departments.dept_id;';
        poolQueryDisplay(query, promptUser);
      } else if (toDo === colors.green("View All Employees")) {
        const query =
          'SELECT employees.employee_id AS "ID", employees.first_name AS "FIRST NAME", employees.last_name AS "LAST NAME", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY", employees.manager_id AS "MANAGER" FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id;';
        poolQueryDisplay(query, promptUser);
      } else if (toDo === colors.magenta("Add A Department")) {
        addDept(promptUser);
      } else if (toDo === colors.red("Add a Role")) {
        addRole(promptUser);
      } else if (toDo === colors.green("Add an Employee")) {
        addEmployee(promptUser);
      } else {
        updateEmployee(promptUser);
      }
    });
}

promptUser();

// if (toDo === colors.magenta("View All Departments")) {
//   console.log("This is still working");
//   pool.query(
//     'SELECT departments.dept_id as "ID", departments.dept_name as "NAME" FROM departments;',
//     (err, res) => {
//       if (err) {
//         console.error("Error executing query:", err);
//       } else {
//         console.log("Query result", res.rows);
//       }
//       pool.end();
//     }
//   );
// } else {
//   console.log("this isn't working");
// }

//THIS PART WORKS!!!
// let query = "";

// if (toDo === colors.magenta("View All Departments")) {
//   query =
//     'SELECT departments.dept_id as "ID", departments.dept_name as "NAME" FROM departments;';
// } else if (toDo === colors.red("View All Roles")) {
//   query =
//     'SELECT roles.role_id AS "ID", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY" FROM roles JOIN departments ON roles.dept_id = departments.dept_id;';
// } else if (toDo === colors.green("View All Employees")) {
//   query =
//     'SELECT employees.employee_id AS "ID", employees.first_name AS "FIRST NAME", employees.last_name AS "LAST NAME", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY", employees.manager_id AS "MANAGER" FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id;';
// }

// pool.query(query, (err, res) => {
//   if (err) {
//     console.error("Error executing query:", err);
//   } else {
//     console.table(res.rows);
//   }
//   promptUser();
// });
// });
