
const res = require('express/lib/response');
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
        switch (userChoice) {
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
            case "Update employee manager":
                updateManager()
                break;
            case 'View employee by manager':
                viewEmployeeByManager()
                break;
            case 'View employees by department':
                viewEmployeeByDepartment()
                break;
            case 'Delete departments, roles and employees':
                deleteChoices()
                break;

        }
    });

}

function viewEmployees(){
    connection.query("SELECT * FROM employee;", (err, res) => {
        if(err) throw err
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
        ]).then(function (res) {
            connection.query("INSERT INTO roles SET ?", {
                title: res.Title,
                salary: res.Salary,
            },
                function (err) {
                    if (err)
                        throw err;
                    console.table(res);
                    startApplication();
                });
        });
    });
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
    ]).then(function(userChoice) {
        const roleId = viewRoles().indexOf(userChoice.roles) + 1
        const ManagerId = selectManager().indexOf(userChoice) + 1
        connection.query('INSERT INTO employee SET ?',
        {
            first_name:userChoice.firstName,
            last_name:userChoice.lastName,
            manager_id:ManagerId,
            role_id:roleId
        },
        function(err){
            if(err) throw err
            console.table(userChoice);
            startApplication()
        })
    })
}

function updateRole() {
    connection.query("SELECT roles.title FROM roles JOIN department ON role_id = roles.id;",
        function (err, res) {
            if (err) throw err
            console.log(res);
            inquirer.prompt([
                {
                    type: 'rawlist',
                    name: 'lastName',
                    choices: function () {
                        const lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name)
                        }
                        return lastName;
                    },
                    message: "Which employee's role would you like to update?",
                },
                {
                    name:"roles",
                    type:"rawlist",
                    message:"What is the employee new title?",
                    choices: viewRoles()
                },
            ]).then(function(userChoice) {
                const roleId = viewRoles().indexOf(userChoice.roles) + 1
                connection.query('UPDATE employee SET WHERE ?',
                {
                    last_name:userChoice.lastName
                },
                {
                    role_id:roleId
                },
                ),function(err){
                    if(err) throw err
                    console.table(userChoice);
                    startApplication()
                }
            })
        })
}

