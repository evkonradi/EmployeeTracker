const inquirer = require('inquirer');
const cTable = require('console.table');
const {viewAllDepartmentsDB, addDepartmentDB} = require('./db/dbQueries');

const promptMenu = ()  => {
  
    console.log('\n******************************\n');
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View all departments', 'Add a department', 'View all roles', 'Quit']
    })
    .then(({action})=>{
        if (action === 'View all departments'){
            viewAllDepartments();
        }
        else if (action === 'Add a department'){
            addDepartment();
        }
        else if (action === 'View all roles'){
            viewAllRoles();
        }
        else{
            process.exit();
        }
    });
};

// Departments
const viewAllDepartments = () =>{
    viewAllDepartmentsDB()
        .then(([rows]) =>{
            console.log('\n');
            console.table(rows);
        })
        .then(() => promptMenu());
}

const addDepartment = () =>{
    inquirer.prompt(            {
        type: 'input',
        name: 'name',
        message: "What is Department name? (Required)",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log(" Please enter Department name!");
            return false;
          }
        }
    })
    .then(answers =>{
        addDepartmentDB([answers.name])
            .then(() => console.log('The department is added!'))
            .then(() => promptMenu());
    });
}

//Roles
const viewAllRoles = () =>{
    viewAllDepartmentsDB()
        .then(([rows]) =>{
            console.log('\n');
            console.table(rows);
        })
        .then(() => promptMenu());
}


promptMenu();

