DROP DATABASE IF EXISTS company;

CREATE DATABASE company;

\c company;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    role_salary DECIMAL NOT NULL,
    dept_id INTEGER NOT NULL,
    FOREIGN KEY (dept_id)
    REFERENCES departments(dept_id)
);

-- Employee Table
-- em

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) 
    REFERENCES employees(employee_id)
);


       
       INSERT INTO departments (dept_name)
        VALUES
            ('Engineering'),
            ('Finance'),
            ('Legal'),
            ('Sales');

        INSERT INTO roles (role_title, role_salary, dept_id)
        VALUES
            ('Sales Lead', 100000, 4),
            ('Salesperson', 80000, 4),
            ('Lead Engineer', 150000, 1),
            ('Software Engineer', 120000, 1),
            ('Account Manager', 160000, 2),
            ('Accountant', 125000, 2),
            ('Legal Team Lead', 250000, 3),
            ('Lawyer', 190000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, null),
('Kevin', 'Tupak', 3, 3),
('Kunal', 'Singh', 5, null),
('Malia', 'Brown', 5, 4),
('Sarah', 'Lourd', 7, null),
('Tom', 'Allen', 8, 7),
('mark', 'jones', 3, 3),
('james', 'smith', 3, 3);



-- SELECT e.employee_id AS "ID", e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY", CONCAT(m.first_name, ' ', m.last_name) AS "MANAGER" 
-- FROM employees e 
-- JOIN roles ON e.role_id = roles.role_id 
-- JOIN departments ON roles.dept_id = departments.dept_id 
-- LEFT JOIN employees m ON e.manager_id = m.employee_id 
-- GROUP BY e.manager_id;

SELECT  CONCAT(e.first_name, ' ', e.last_name) AS "EMPLOYEE", CONCAT(m.first_name, ' ', m.last_name) AS "MANAGER"
FROM employees e 
LEFT JOIN employees m ON e.manager_id = m.employee_id ORDER BY e.manager_id, e.first_name;


-- SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS 

SELECT CONCAT(e.first_name, ' ', e.last_name) AS "EMPLOYEE", departments.dept_name AS "DEPARTMENT"
FROM employees e
JOIN roles
ON e.role_id = roles.role_id
JOIN departments
ON roles.dept_id = departments.dept_id
ORDER BY departments.dept_name, e.first_name;
