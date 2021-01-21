var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "blackberry",
  database: "employeeOrg"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});


function start() {
  inquirer
    .prompt({
      name: "addViewUpdate",
      type: "list",
      message: "Would you like to do?",
      choices: ["ADD departments", "ADD roles", "ADD employees", "VIEW departments", "VIEW roles", "VIEW employess", "UPDATE employee roles"]
    })
    .then(function(answer) {

      if (answer.addViewUpdate === "ADD departments") {
        addDepartment();
      }
      else if(answer.addViewUpdate === "ADD roles") {
        addRole();
      }
      else if(answer.addViewUpdate === "ADD employees") {
        addEmployee();
      }
      else if(answer.addViewUpdate === "VIEW departments") {
        viewDepartment();
      }
      else if(answer.addViewUpdate === "VIEW roles") {
        viewRole();
      }
      else if(answer.addViewUpdate === "VIEW employees") {
        viewEmployee();
      }
      else if(answer.addViewUpdate === "UPDATE employee roles") {
        updateEmployeeRole();
      } 
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What department would you like to add?",
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          start();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What employee role would you like to add?"
      },
      {
        name: "title",
        type: "input",
        message: "What is the title you would like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary this role will be paid?"
      },
      {
        name: "departmentId",
        type: "input",
        message: "What is the department ID?"
      },
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id
        },
        function(err) {
          if (err) throw err;
          console.log("Your new employee role, title, salary and department id was created successfully!");
          start();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of the employee you would like to add?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name?"
      },
      {
        name: "role",
        type: "input",
        message: "What role id will this employee have?"
      },
      {
        name: "managerId",
        type: "input",
        message: "What will be the manager id for this employee?"
      },
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        },
        function(err) {
          if (err) throw err;
          console.log("Your new employee was created successfully!");
          start();
        }
      );
    });
}

function viewDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What department would you like to view?",
      }
    ])
    .then(function(answer) {
      connection.query(
        "SELECT * FROM department",
        {
          name: answer.department
        },
        function(err) {
          if (err) throw err;
          start();
        }
      );
    });
}

function viewEmployee() {
  inquirer
    .prompt([
      {
        name: "employees",
        type: "input",
        message: "What is the first name of the employee would you like to view?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name?"
      },
      {
        name: "employeeRole",
        type: "input",
        message: "What role does this employee hold?"
      },
      {
        name: "managersID",
        type: "input",
        message: "Does this employee have a manange Id?"
      },
    ])
    .then(function(answer) {
      connection.query(
        "SELECT * FROM employee",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        },
        function(err) {
          if (err) throw err;
          start();
        }
      );
    });
}

function viewRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of this employee?"
      },
    ])
    .then(function(answer) {
      connection.query(
        "SELECT * FROM role",
        {
          title: answer.title
        },
        function(err) {
          if (err) throw err;
          start();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "departmentID",
        type: "input",
        message: "What is the department Id this employee works in?"
      },
      {
        name: "title",
        type: "input",
        message: "What what is the role of this employee?"
      },
      {
        name: "firstName",
        type: "input",
        message: "What is this employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name?"
      },
      {
        name: "role",
        type: "input",
        message: "What is the role Id of this employee?"
      },
    ])
    .then(function(answer) {
      connection.query(
        "SELECT * FROM INNER JOIN ?",
        {
          department_id: answer.department_id,
          title: answer.title,
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee role has been successfully updated!");
          connection.end()
        }
      );
    });
}



