const inquirer = require("inquirer");
const colors = require("colors");

const { modifyTable } = require("./queries");

function addDept(callback) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "dept_name",
      },
    ])
    .then((answer) => {
      const { dept_name } = answer;
      const sql = `INSERT INTO departments (dept_name) VALUES ($1)`;
      const params = [dept_name];

      console.log(dept_name);

      modifyTable(sql, params, callback);

      console.log("Added " + dept_name + " to the database");
    });
}

module.exports = addDept;
