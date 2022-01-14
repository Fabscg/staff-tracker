INSERT INTO employee (first_name, last_name, department_name, salary, manager, role_id)
VALUE('Mike', 'Chan', 'Sales', 80000, 'John Doe'),
('Ashley', 'Rodriguez', 'Engineering', 150000, NULL),
('kEVIN', 'Tupik', 'Engineering', 120000, 'Ashley rodriguez'),
('Kunal', 'Singh', 'Finance', 160000, NULL),
('Malia', ' Brown', 'Finance', 1250000, 'Kunal Singh'),
('Sarah', 'Lourd', 'Legal', 250000, NULL),
('Tom', 'Allen', 'Legal', 190000, 'Sarah Lourd')

INSERT INTO role ( title, salary, department_id)
VALUE('Salesperson', 80000, 2),
('Lead Engineer', 150000, 3),
('Software Engineer', 120000, 4),
('Account Manager', 160000, 5),
('Accountant', 125000, 6),
('Legal Team Lead', 250000, 7),
('Lawyer', 190000, 8),

INSERT INTO department(id, department_name)
VALUE(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4,'Legal');

SELECT * FROM  department;
SELECT * FROM roles;
SELECT * FROM employee;