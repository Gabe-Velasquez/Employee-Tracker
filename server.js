// Importing dependencies
const inquirer = require('inquirer');
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
})

//! Need to write question form to ask user