// Importing dependencies
const inquirer = require('inquirer');
const conTable = require('console.table');
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employee_db',
  },
  console.log('Connection successful to the employee database.')
);

db.connect(function (err) {
  if (err) throw err;
  console.log('                                                  ');
  console.log('          Welcome to employee database!           ');
  console.log('                                                  ');
  // inquirer question function goes here
  startQuestion();
});

//! Need to write question form to ask user
function startQuestion() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'introduction',
        message: 'Please select',
        choices: [
          'View All Active Employees',
          'Add Employee',
          // 'Remove Employee' *Feature to be added in future*
          'Update Employee',
          'View All Roles',
          'Add Role',
          'View All Departments',
          'Add Department',
          'Quit',
        ],
      },
    ])
    .then((answer) => {
      //Generate switch case to evaluate user's answer. Need to create functions that I am leading users to.
      switch (answer.introduction) {
        //View all employee condition
        case 'View All Active Employees':
          viewEmployees();
          break;
        //Add employee condition
        case 'Add Employee':
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
    });
}

// Add Options
function addEmployee() {
  const sqlRole = `SELECT * FROM role`;
  db.query(sqlRole, (err, res) => {
    roleList = res.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    const sqlEmp = `SELECT * FROM employee WHERE manager_id IS NULL`;
    db.query(sqlEmp, (err, res) => {
      managerList = res.map((employee) => ({
        name: employee.first_name.concat(' ', employee.last_name),
        value: employee.id,
      }));

      return inquirer
        .prompt([
          {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of your employee?',
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of your employee?',
          },
          {
            type: 'list',
            name: 'role',
            message: 'What was your employee hired on as?',
            choices: roleList,
          },
          {
            type: 'list',
            name: 'manager',
            message: 'Which manager does the employee report to?',
            choices: managerList,
          },
        ])
        .then((answers) => {
          const sqlCreate = `INSERT INTO employee SET first_name='${answers.first_name}', last_name='${answers.last_name}', role_id=${answers.role}, manager_id = ${answers.manager};`;
          db.query(sqlCreate, (err, res) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(`Added ${answers.first_name} to our database!`);
            startQuestion();
          });
        });
    });
  });
}

function addRole() {
  const sqlDept = `SELECT * FROM department`;
  db.query(sqlDept, (err, res) => {
    //map method to go through all roles
    departmentList = res.map((departments) => ({
      name: departments.name,
      value: departments.id,
    }));
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'newRole',
          message: 'What is the title of the new role?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of this role?',
        },
        {
          type: 'list',
          name: 'department',
          message: 'Which department does this role belong to?',
          choices: departmentList,
        },
      ])
      .then((answers) => {
        const sqlRole = `INSERT INTO role SET title = ${answers.newRole}, department_id=${answers.department}, salary = ${answers.salary};`;
        db.query(sqlRole, (err, res) => {
          console.log(`Added ${answers.newRole} to the database`);
          startQuestion();
        });
      });
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department',
        message: 'What is the name of your department?',
      },
    ])
    .then((answers) => {
      const sqlDept = `INSERT INTO department(name) VALUES('${answers.department}');`;
      db.query(sqlDept, (err, res) => {
        console.log(
          `Successfuly added ${answers.department} to our list of departments!`
        );
        startQuestion();
      });
    });
}

// Update Option
function updateEmployee() {
  //map method used to get array for all employees, roles, and managers so we can display them later in the function
  const sqlEmp = `SELECT * FROM employee`;
  db.query(sqlEmp, (err, res) => {
    employeeList = res.map((employee) => ({
      name: employee.first_name.concat(' ', employee.last_name),
      value: employee.id,
    }));
    //
    const sqlRole = `SELECT * FROM role`;
    db.query(sqlRole, (err, res) => {
      roleList = res.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      const sqlEmp = `SELECT * FROM employee WHERE manager_id IS NULL`;
      db.query(sqlEmp, (err, res) => {
        managerList = res.map((employee) => ({
          name: employee.first_name.concat(' ', employee.last_name),
          value: employee.id,
        }));
        //   const sqlManager = `SELECT * FROM employee WHERE manager_id IS NULL`;
        //   db.query(sqlManager, (err, res) => {
        //     managerList = res.map((employee) => ({
        //       name: employee.first_name.concat(' ', employee.last_name),
        //       value: employee.id,
        //     }));
        //   });
        //returns the question prompt to user so we can see who they need to edit, where and which manager they will report to now.
        return inquirer
          .prompt([
            {
              type: 'list',
              name: 'employee',
              message: 'Which employee would you like to make edits to?',
              choices: employeeList,
            },
            {
              type: 'list',
              name: 'role',
              message: 'What new role does the selected employee do now?',
              choices: roleList,
            },
            {
              type: 'list',
              name: 'manager',
              message: 'Who will the employee report to now?',
              choices: managerList,
            },
          ])
          .then((answers) => {
            //this is where we update our employee information that we got from inquirer above and store on the database.
            const employeeUpdated = `UPDATE employee SET manager_id=${answers.manager}, role_id=${answers.role} WHERE id = ${answers.employee};`;
            db.query(employeeUpdated, (err, res) => {
              if (err) throw err;
              console.log('Employee changes are complete!');
              startQuestion();
            });
          });
      });
    });
  });
}

//View Options
function viewEmployees() {
  const sqlEmp = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;`;
  //Pass variable above into query
  db.query(sqlEmp, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(res);
    startQuestion();
  });
}

function viewRoles() {
  const sqlRole = `SELECT role.id, role.title AS role, role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.department_id);`;
  db.query(sqlRole, (err, res) => {
    console.table(res);
    startQuestion();
  });
}

function viewDepartments() {
  const sqlDept = `SELECT department.id, department.name AS Department FROM department;`;
  db.query(sqlDept, (err, res) => {
    console.table(res);
    startQuestion();
  });
}
