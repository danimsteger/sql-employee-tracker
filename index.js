const inquirer = require("inquirer");
const colors = require("colors");

const { Pool } = require("pg");
const pool = new Pool(
  {
    user: "",
    password: "",
    host: "localhost",
    database: "company",
  },
  console.log("Connected to company database.")
);

pool.connect();

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
      console.log("This is still working");
      pool.query(
        'SELECT departments.dept_id as "ID", departments.dept_name as "NAME" FROM departments;',
        (err, res) => {
          if (err) {
            console.error("Error executing query:", err);
          } else {
            console.log("Query result", res.rows);
          }
          pool.end();
        }
      );
    } else {
      console.log("this isn't working");
    }
  });
