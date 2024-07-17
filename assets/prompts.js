const inquirer = require("inquirer");
const colors = require("colors");

const { poolQueryAdd } = require("./queries");
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

      poolQueryAdd(sql, params, callback);

      console.log("Added " + dept_name + " to the database");
    });
}

async function getDepts() {
  try {
    const result = await pool.query(`SELECT * FROM departments`);
    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

async function addRole(callback) {
  try {
    const departments = await getDepts();

    const departmentNames = departments.map(
      (department) => department.dept_name
    );

    const departmentIDs = departments.reduce((acc, department) => {
      acc[department.dept_name] = department.dept_id;
      return acc;
    }, {});

    const answer = await inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "role_title",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "role_salary",
      },
      {
        type: "list",
        message: "What department does the role belong to?",
        choices: departmentNames,
        name: "dept_name",
      },
    ]);

    const { role_title, role_salary, dept_name } = answer;
    const dept_id = departmentIDs[dept_name];

    const sql = `INSERT INTO roles (role_title, role_salary, dept_id) VALUES ($1, $2, $3)`;
    const params = [role_title, role_salary, dept_id];

    console.log(
      "This is my department name:" +
        dept_name +
        " And this is my department id " +
        dept_id
    );

    await poolQueryAdd(sql, params, callback);

    console.log("Added " + role_title + " to the database");
  } catch (error) {
    console.error("Error adding role", error);
  }
}

async function getRoles() {
  try {
    const result = await pool.query(`SELECT * FROM roles`);
    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

async function addEmployee(callback) {
  try {
    const roles = await getRoles();

    const roleNames = roles.map((role) => role.role_title);

    const roleIDs = roles.reduce((acc, role) => {
      acc[role.role_title] = role.role_id;
      return acc;
    }, {});

    const answer = await inquirer.prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        choices: roleNames,
        name: "role_title",
      },
    ]);

    const { first_name, last_name, role_title } = answer;
    const role_id = roleIDs[role_title];

    const sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)`;
    const params = [first_name, last_name, role_id];

    console.log(
      "This is my employee name:" +
        first_name +
        last_name +
        " And this is my role id " +
        role_id
    );

    await poolQueryAdd(sql, params, callback);

    console.log("Added " + first_name + last_name + " to the database");
  } catch (error) {
    console.error("Error adding employee", error);
  }
}

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

    const { employee_id, role_title } = answer;
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

    await poolQueryAdd(sql, params, callback);

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

module.exports = { addDept, addRole, addEmployee, updateEmployee };
