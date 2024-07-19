// Import packages
const inquirer = require("inquirer");
const colors = require("colors");

// Import query function to modify a table
const { modifyTable, getRoles } = require("../queries");

async function deleteRole(callback) {
  try {
    const roles = await getRoles();
    const roleNames = roles.map((role) => role.role_title);

    // Creates an object of key value pairs of 'role_title': role_id
    const roleIDs = roles.reduce((acc, role) => {
      acc[role.role_title] = role.role_id;
      return acc;
    }, {});

    const answer = await inquirer.prompt([
      {
        type: "list",
        message: "Which role would you like to delete?",
        choices: roleNames,
        name: "role_title",
      },
    ]);

    const { role_title } = answer;
    // Gets the id of the selected role

    const selectedRoleId = roleIDs[role_title];

    const sql = `DELETE FROM roles WHERE role_id = $1`;
    const params = [selectedRoleId];

    await modifyTable(sql, params, callback);
    console.log(
      colors.yellow.bold(role_title),
      colors.red(" was deleted from roles.")
    );
  } catch (error) {
    console.error("Error deleting departmenta:", error);
  }
}

module.exports = deleteRole;
