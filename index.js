
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
                'View all departments',
                'View all roles',
                'View all employees',
                'Add department',
                'Add role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ]).then(response => {
        console.log(response)
        let userChoice = response.options;
        console.log(userChoice)
        switch( userChoice )  {
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
            case 'Add an Employee':
                addEmployee()
                break;
            case 'Update an employee role':
                updateRole()
                break;

            // default:console.table();
               
        }
    });

}

function viewDepartments() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        startApplication();
    })
    
}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the role to add?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this position?"
            },
            {
                type: "input",
                name: "department",
                message: "What is the department id for this role"
            }
        ]).then((answer) => {
            connection.query(
                "INSERT INTO role SET title = ?, salary = ?, department_id = ?",
                [answer.title, answer.salary, answer.department],
                (err, res) => {
                    if (err) throw err
                    console.table(res);
                    startApplication()
                }
            )
        })


}


function viewEmployees() {
    connection.query("SELECT * FROM employee;",
        (err, res) => {
            if (err) throw err
            console.table(res)
            startApplication();
        })
        
}

function viewRoles() {
    connection.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err
        console.table(res);
        startApplication();
    });
}


function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What department would you like to add?'
        }
    ]).then((userChoice) => {
        connection.query(
            "INSET INTO department SET name ?",
            userChoice.department,
            (err, res) => {
                if(err) throw err
                viewDepartments();
                console.log("Added `department_name` to the database");
                startApplication()
            }   
        )
    })
}
function addRole() {
    connection.query("SELECT role.title AS Title, role.id AS Id, role.department AS Department, role.salary AS Salary FROM role", function (err, res) {
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
                name: 'department',
                message: 'Which department does the role belong to?'
            },
            {
                type: 'input',
                name: 'managerId',
                message: "Enter the employee's manager id"
            }
        ]).then((userChoice) => {
            connection.query(
                "INSERT INTO role SET role_id = ?, salary = ?, department_id = ?",
                [userChoice.role_id, userChoice.salary, userChoice.department],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    startApplication()
                }
            )
        })
    })
}
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's role?",
            choices: addRole()
        },
        {
            type: 'input',
            name: 'manager',
            message: "What is the employee's manager?",
            choices: addManager()
        }
    ]).then((userChoice) => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: userChoice.firstName,
                last_name: userChoice.lastName,
                role_id: userChoice.role,
                manager_id: userChoice.managerId
            },
            (err, res) => {
                if (err) throw err
                startApplication()
            }
        )
    })
}

function updateRole() {
    connection.query("SELECT roles.title FROM roles JOIN department ON role_id = role.id;",
        function (err, res) {
            if (err) throw err
            console.log(res);
            inquirer.prompt([
                {
                    type: 'rawlist',
                    name: 'lastName',
                    choices: function () {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name)
                        }
                        return lastName;
                    },
                    message: "Which employee's role would you like to update?"
                }
            ])
        })
}

