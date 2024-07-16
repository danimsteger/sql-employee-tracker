
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
            ('Accountant', 1250000, 2),
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
('Tom', 'Allen', 8, 7);


SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
