// Importing dependencies
const inquirer = require('inquirer');
const conTable = require('console.table');
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "employee_db"
    },
    console.log('Connection successful to the employee database.')
);

db.connect(function(err){
    if (err)throw err;
    console.log('                                                  ')
    console.log('          Welcome to employee database!           ')
    console.log('                                                  ')
    // inquirer question function goes here
    startQuestion()
})

//! Need to write question form to ask user
async function startQuestion(){
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'introduction',
            message: 'Please select',
            choices:[
                'View All Active Employees',
                'Add Employee',
                // 'Remove Employee' *Feature to be added in future*
                'Update Employee',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
                ]
        }
    ]);

    //Generate switch case to evaluate user's answer. Need to create functions that I am leading users to.
    switch (answer.introduction){
        //View all employee condition
        case 'View All Active Employees':
            viewEmployees(); 
            break;
        //Add employee condition 
        case 'View All Active Employees':
            addEmployee(); 
            break;
        // //Remove employee condition
        // case 'Remove Employee':
        //     removeEmployee(); 
        //     break;

        // Update Employee
        case 'Update Employee':
            updateEmployee(); 
            break;
        // View Roles
        case 'View All Roles':
            viewRoles(); 
            break;
        // Add Role
        case 'Add Role':
            addRole(); 
            break;
        // View Departments
        case 'View All Departments':
            viewDepartments(); 
            break;
        // Add Department
        case 'Add Department':
            addDepartment();
            break;
        // Quit option
        case 'Quit':
            console.log('Until next time!');
            db.end();
            break;
    }
};

// Add Options
function addEmployee(){

};

function addRole(){

};

function addDepartment(){

};

// Update Option
function updateEmployee(){

};

//View Options
function viewEmployees(){
    const sqlEmp = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id  =  employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee_id;`
    //Pass variable above into query
    db.query(sqlEmp, (err,res)=>{
        console.table(res);
        startQuestion();
    })

}; 

function viewRoles(){

};

function viewDepartments(){

};