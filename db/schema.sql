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

