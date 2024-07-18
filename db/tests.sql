-- Employees Table

DROP DATABASE IF EXISTS company2;

CREATE DATABASE company2;

\c company2;

DROP TABLE IF EXISTS employees2;

CREATE TABLE employees2 (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (manager_id) 
    REFERENCES employees2(employee_id)
);


INSERT INTO employees2 (first_name, last_name, manager_id)
VALUES
('John', 'Doe', NULL),
('Mike', 'Chan', 1),
('Ashley', 'Rodriguez', null),
('Kevin', 'Tupak', 3),
('Kunal', 'Singh', null),
('Malia', 'Brown', 4),
('Sarah', 'Lourd', null),
('Tom', 'Allen', 7);


SELECT * FROM employees2;

SELECT e.employee_id AS "ID", e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", CONCAT(m.first_name, ' ', m.last_name) AS "MANAGER"
FROM employees2 e
LEFT JOIN employees2 m ON e.manager_id = m.employee_id;
