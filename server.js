//Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
require = ("console.table");


//connect to mysql workbench
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "R3ign3z31.",
    database: "employee_db",
});

connection.connect(function(err){
    if(err) throw err;
    runEmployeePrompt();
});


//prompt choices
function runEmployeePrompt(){
    inquirer.prompt([{
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["View All Employees", "View Employees by Department",
        "View Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Done"
    ]
    }]).then (function(answer){
        switch(answer.action) {
            case "View All Employees":
                viewEmployees();
                break;
            case "View Employees by Department":
                viewEmployeesByDept();
                break;
            case "View Employees by Manager":
                viewEmployeesByManager();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            default:
                process.exit();

        
        }
    })
}

function viewEmployees() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM empoyee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    connection.query(query, (err,data)=>{
        console.table(data)
        runEmployeePrompt();
    })
}

function viewEmployeesByDept() {
    inquirer
        .prompt([{
            name: "action",
            type: "rawlist",
            message: "Please select the departments you would like to view employess from",
            choices: ["Admin", "Marketing", "Finance", "Sales", "HR", "IT", "Operations Management"]
        }])
        .then(function(answer) {
            console.log(answer)

        })

}

function viewEmployeesByManager() {

    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM empoyee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    connection.query(query, (err,data)=>{
        console.table(data)
        runEmployeePrompt();
    })

}


function addEmployee() {
    inquirer
        .prompt([{

                type: "input",
                name: "first_name",
                message: "Please provide the employee's first name",
            },
            {
                type: "input",
                name: "last_name",
                message: "Please provide the employee's last name",
            },
            {
                type: "input",
                name: "role_id",
                message: "Please enter a role ID",
            },
            {
                type: "input",
                name: "manager_id",
                message: "Please enter a manager ID",
            }
        ])
        .then(function(answer) {
            console.log(answer)
            connection.query("INSERT INTO employee SET ?", {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id,
            }, function(err) {
                if (err) throw (err)
                console.log("Employee succesfully added!")
                console.log(err)
                runEmployeePrompt();
            })
        })
}

function removeEmployee() {
   
    const add = connection.query(
        "DELETE FROM employee WHERE id = ?",
        [id],
        function (error, _id) {
            if (error) throw error
        })
        viewEmployees(); 


}

function updateEmployeeRole() {
    const byRole = connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",

        [roleId, employeeId],
        function (error, role) {
            if (error) throw error

        })
        viewEmployeesByDept()


}

function updateEmployeeManager() {
    var updateManager = connection.query(
        "UPDATE employee SET manager_id = ? WHERE id = ?",
        [managerId, employeeId],
        function (error, updateManager) {
            if (error) throw error
            
        })
        viewEmployeesByManager();

}