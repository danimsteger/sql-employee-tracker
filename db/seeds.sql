-- Seed database with data to properly view functionality of applicaton

-- Insert departments into departments table
INSERT INTO departments (dept_name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales'),
    ('Marketing');

-- Insert roles into roles table
INSERT INTO roles (role_title, role_salary, dept_id)
VALUES
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4),
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Account Manager', 160000, 2),
    ('Accountant', 125000, 2),
    ('Legal Team Lead', 250000, 3),
    ('Lawyer', 190000, 3),
    ('Social Media Manager', 250000, 5);

-- Insert employees into employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Meredith', 'Grey', 1, NULL),
    ('Olivia', 'Rodrigo', 2, 1),
    ('Daenerys', 'Targaryen', 3, null),
    ('Sansa', 'Stark', 3, 3),   
    ('Jeff', 'Probst', 5, null),
    ('Christina', 'Yang', 5, 4),
    ('Derek', 'Shepherd', 4, 4),
    ('Dua', 'Lipa', 7, null),
    ('Gracie', 'Abrams', 9, 1),
    ('Jon', 'Snow', 8, 1);


-- Display above tables with the inserted information
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

