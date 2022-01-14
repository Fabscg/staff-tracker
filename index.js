const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table')
const inquirer = require('inquirer')

promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add an employee', 'Update an employee role']
        }
    ]).then(answer => {
        switch (answer.chosen) {
            case 'View all departments':
                createFormattedTable()
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
        }
    })
}

function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS  Title")
   
}
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    ]).then(function(res) {
        const query = connection.query(
            "INSERT INTO department SET ?",
            {
                name:res.name
            },
            function(err) {
                if(err) throw err
                console.table(res)
                promptUser;
            }
        )
    })
}
function addRole() {
    connection.query("SELECT role.title AS Title, role.id AS Id, role.department AS Department, role.salary AS Salary FROM role", function (err, res){
        inquirer.prompt([
            {
                type:'input',
                name:'title',
                message:'What is the name of the role?'
            },
            {
                type:'input',
                name:'salary',
                message:'What is the salary of this role?'
            },
            {
                type:'input',
                name:'department',
                message:'Which department does the role belong to?'
            }
        ]).then(function(res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title:res.Title,
                    salary:res.Salary
                },
                function(err){
                    if(err) throw err
                    console.table(res);
                    promptUser()
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
            message: 'Enter their first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'enter their last name'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Enter role'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Enter their manager'
        }
    ])
}

