
// const res = require('express/lib/response');
const inquirer = require('inquirer')
const mysql = require('mysql2')




const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Mon@M@rvin',
    database: 'employee_tracker',
});
connection.connect((err) => {
    if (err) throw err
    startApplication();
})


startApplication = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View all',
                'View all departments',
                'View all roles',
                'View all employees',
                'Add department',
                'Add role',
                'Add an employee',
                'Update an employee role',
                'Delete Employee'
            ]
        }
    ]).then(response => {
        console.log(response)
        let userChoice = response.options;
        console.log(userChoice)
        switch (userChoice) {
            case 'View all':
                viewAll()
                break;
            case 'View all departments':
                viewDepartments()
                break;
            case 'View all roles':
                viewRoles()
                break;
            case 'View all employees':
                viewEmployees()
                break;
            case 'Add department':
                addDepartment()
                break;
            case 'Add role':
                addRole()
                break;
            case 'Add an employee':
                addEmployee()
                break;
            case 'Update an employee role':
                updateEmployeeRole()
                break;
            case 'Delete departments, roles and employees':
                deleteEmployee()
                break;

        }
    });

}

function viewAll() {
    connection.query("SELECT * FROM department FULL OUTER JOIN roles ON department ")
}



function viewEmployees() {
    connection.query("SELECT * FROM employee;", (err, res) => {
        if (err) throw err
        console.table(res);
        startApplication();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        startApplication();
    })

}

function viewRoles() {
    connection.query("SELECT * FROM roles;", (err, res) => {
        if (err) throw err
        console.table(res);
        startApplication()
    })

}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'what is the deparment ID this role belong to?'
        }
    ]).then(function (res) {
        connection.query("INSERT INTO roles SET ?", {
            title: res.title,
            salary: res.salary,
            department_id: res.department_id
        },
            function (err) {
                if (err)
                    throw err;
                console.table(res);
                startApplication();
            });
    });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "first",
                message: 'What is your new employees first name?'
            },
            {
                type: 'input',
                name: 'last',
                message: "what is your employee's last name?",
            },
            {
                type: 'input',
                name: 'role',
                message: "what is your employee's role ID number",
            },
            {
                type: 'input',
                name: 'manager',
                message: "what is your employee's manager ID number?",
            },

        ]).then((res) => {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.first,
                    last_name: res.last,
                    role_id: res.role,
                    manager_id: res.manager
                },
                (err, res) => {
                    if (err)
                        throw err;
                    console.table(res);
                    viewEmployees();
                }
            );
        });
}

function updateEmployeeRole() {
    connection.query("SELECT * FROM employee ORDER BY first_name", (err, res) => {
        let employees = res.map((employee) => {
            console.log(res);
            return {
                name: employee.first_name + ' ' + employee.last_name,
                value: employee.id
            }
        })
        connection.query("SELECT * FROM roles ORDER BY title", (err, res) => {
            let roles = res.map((role) => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'update_employee',
                        message: 'Which employee would you like to undate?',
                        choices: employees
                    },
                    {
                        type: 'list',
                        name: 'update_role',
                        message: "What is your employee's new role?",
                        choices: roles,
                    }
                ]).then((res) => {
                    connection.query("UPDATE employees SET role_id = ? WHERE id = ?",
                        [res.update_role, res.update_employee],
                        (err, res) => {
                            console.table(res);
                            viewEmployees();
                        })
                })
        })
    })
}

function deleteEmployee() {
    console.log("Deleting an employee");

    var query =
        `SELECT e.id, e.first_name, e.last_name
        FROM employee e`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
            value: id, name: `${id} ${first_name} ${last_name}`
        }));

        console.table(res);
        console.log("ArrayToDelete!\n");

        promptDelete(deleteEmployeeChoices);
    });
}

function promptDelete(deleteEmployeeChoices) {

    inquirer
        .prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee do you want to remove?",
                choices: deleteEmployeeChoices
            }
        ])
        .then(function (res) {

            var query = `DELETE FROM employee WHERE ?`;
            connection.query(query, { id: res.employeeId }, function (err, res) {
                if (err) throw err;

                console.table(res);
                console.log(res.affectedRows + "Deleted!\n");

                startApplication();
            });
        });
}

