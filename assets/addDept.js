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

      modifyTable(sql, params, callback);

      console.log(
        colors.yellow.bold(dept_name),
        colors.magenta(" was added to departments.")
      );
    });
}

module.exports = addDept;
