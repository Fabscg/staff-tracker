INSERT INTO employee (first_name, last_name, role_id, manager,)
VALUE('Mike', 'Chan', 1, 'John Doe'),
('Ashley', 'Rodriguez',2 , NULL),
('kEVIN', 'Tupik', 2, 'Ashley rodriguez'),
('Kunal', 'Singh', 3, NULL),
('Malia', ' Brown', 3, 'Kunal Singh'),
('Sarah', 'Lourd', 4, NULL),
('Tom', 'Allen', 4, 'Sarah Lourd')

INSERT INTO role ( title, salary, department_id)
VALUE('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4),

INSERT INTO department(id, department)
VALUE(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4,'Legal');

SELECT * FROM  department;
SELECT * FROM roles;
SELECT * FROM employee;