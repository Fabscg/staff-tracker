
const fs = require('fs');
const cTable = require('console.table')
const inquirer = require('inquirer')
const mysql = require('mysql2')


const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password:'Mon@M@rvin',
        database: 'employee_tracker'
    },
    console.log('Connected to  the database.')
);

connection.connect((err) => {
    if(err) throw err
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
    ]).then(answer => {
        switch (answer.chosen) {
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
        }
    }).then((answer) => {
        connection.query()
    })
}

function viewDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS department FROM employee JOIN role ON employee.role_id = roles.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function(err, res) {
        if (err) throw err
        console.table(res);
        startApplication()
    }).then()
}

const roleArray = [];
function addRole(){
    connection.query("SELECT * FROM role", function(err, res) {
        if(err) throw err 
        for(var i = 0; i < res.length; i++){
            roleArray.push(res[i].title)
        }
    })
    return roleArray;
}

const managerArray = []
function selectManager(){
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL;",
    function(err, res) {
        if (err) throw err
        for(var i = 0;i < res.length; i ++) {
            managerArray.push(res[i].first_name)
        }
    })
    return managerArray;
}

function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.department_name, CONCAT(e.first_name, ' ', e.last_name) AS Manager FROM employee INNER JOIN department on department.id = roles.department_id LEFT JOIN employee e on employee.manager_id = e.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startApplication()
        })
}

function viewRoles() {
    conection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = roles.id;",
        function (err, res) {
            if (err) throw err
            console.table(res);
            startApplication()
        })

}


function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What department would you like to add?'
        }
    ]).then(function (res) {
        const query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.name
            },
            function (err) {
                if (err) throw err
                console.table(res)
                startApplication();
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
            }
        ]).then(function (res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary
                },
                function (err) {
                    if (err) throw err
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
    ]).then(function (val) {
        const roleId = addRole().indexOf(val.role) + 1
        const managerId = selectManager().indexOf(val.choices) + 1
        db.query("INSERT INTO employee SET ?",
            {
                first_name: val.firstName,
                last_name: val.lastName,
                manager_id: managerId,
                role_id: roleId
            },
            function (err) {
                if (err) throw err
                console.table(val)
                startApplication();
            })
    })
}
function updateRole(){
    connection.query("SELECT roles.title FROM roles JOIN department ON role_id = role.id;",
    function(err,res) {
        if (err) throw err
        console.log(res);
        inquirer.prompt([
            {
                type:'rawlist',
                name:'lastName',
                choices:function(){
                    var lastName = [];
                    for(var i = 0;i < res.length; i++){
                        lastName.push(res[i].last_name)
                    }
                    return lastName;
                },
                message:"Which employee's role would you like to update?"
            }
        ])
    })
}

