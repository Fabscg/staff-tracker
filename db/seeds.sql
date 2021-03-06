INSERT INTO department(department_name)
VALUE( 'Sales');
INSERT INTO department(department_name)
VALUES('Engineering');
INSERT INTO department(department_name)
VALUES('Finance');
INSERT INTO department(department_name)
VALUES('Legal');

INSERT INTO roles ( title, salary, department_id)
VALUE('Salesperson', 80000, 1);
INSERT INTO roles ( title, salary, department_id)
VALUES('Lead Engineer', 150000, 2);
INSERT INTO roles ( title, salary, department_id)
VALUES('Software Engineer', 120000, 2);
INSERT INTO roles ( title, salary, department_id)
VALUES('Account Manager', 160000, 3);
INSERT INTO roles ( title, salary, department_id)
VALUES('Accountant', 125000, 3);
INSERT INTO roles ( title, salary, department_id)
VALUES('Legal Team Lead', 250000, 4);
INSERT INTO roles ( title, salary, department_id)
VALUES('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Mike', 'Chan', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Ashley', 'Rodriguez', 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Kevin', 'Tupik', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Kunal', 'Singh', 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Malia', 'Brown', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Sarah', 'Lourd', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Tom', 'Allen', 4, 1);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;
