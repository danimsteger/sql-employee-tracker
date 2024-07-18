-- Departments Table

SELECT departments.dept_id as "ID", departments.dept_name as "NAME" FROM departments;


-- Roles Table
SELECT roles.role_id AS "ID", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY"
FROM roles
JOIN departments ON roles.dept_id = departments.dept_id;

-- Employees Table
SELECT e.employee_id AS "ID", e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", roles.role_title AS "TITLE", departments.dept_name AS "DEPARTMENT", roles.role_salary AS "SALARY", CONCAT(m.first_name, ' ', m.last_name) AS "MANAGER"
FROM employees e
JOIN roles
ON e.role_id = roles.role_id
JOIN departments
ON roles.dept_id = departments.dept_id
LEFT JOIN employees m ON e.manager_id = m.employee_id;


-- UPDATE employees SET first_name = 'JANE', last_name = 'SMITH' WHERE employee_id = 8;