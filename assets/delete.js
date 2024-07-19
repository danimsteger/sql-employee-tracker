// Import packages
const inquirer = require("inquirer");
const colors = require("colors");

// Import query function to modify a table
const { modifyTable, getDepts } = require("./queries");

async function deleteItem(callback) {
  try {
    const departments = await getDepts();

    // Creates array of just deparment names
    const departmentNames = departments.map(
      (department) => department.dept_name
    );

    // Creates an object of key value pairs of 'dept_names': dept_id
    const departmentIDs = departments.reduce((acc, department) => {
      acc[department.dept_name] = department.dept_id;
      return acc;
    }, {});

    const answer = await inquirer.prompt([
      {
        type: "list",
        message: "Which department would you like to delete?",
        choices: departmentNames,
        name: "dept_name",
      },
    ]);

    const { dept_name } = answer;
    const dept_id = departmentIDs[dept_name];

    const sql = `DELETE FROM departments WHERE dept_id = $1`;
    const params = [dept_id];

    await modifyTable(sql, params, callback);
    console.log(
      colors.yellow.bold(dept_name),
      colors.magenta(" was deleted from departmetns")
    );
  } catch (error) {
    console.error("Error deleting departmenta:", error);
  }
}

module.exports = deleteItem;
