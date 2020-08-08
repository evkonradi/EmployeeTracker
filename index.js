const inquirer = require('inquirer');
const cTable = require('console.table');
const {viewAllDepartmentsDB, addDepartmentDB, viewAllRolesDB, addRoleDB} = require('./db/dbQueries');
const { values } = require('mysql2/lib/constants/charset_encodings');

const promptMenu = ()  => {
  
    console.log('\n******************************\n');
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View all departments', 'Add a department', 'View all roles', 'Add a role', 'Quit']
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
        else if (action === 'Add a role'){
            addRole();
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
    inquirer.prompt({
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
    viewAllRolesDB()
        .then(([rows]) =>{
            console.log('\n');
            console.table(rows);
        })
        .then(() => promptMenu());
}

const addRole = () =>{
    viewAllDepartmentsDB()
        .then(([rows]) =>{
            let departments = rows.map( ({department_id, department_name}) => ({
                name: department_name,
                value: department_id
            }) );

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: "What is Role name? (Required)",
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log(" Please enter Role name!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "What is Role salary? (Required)",
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log(" Please enter Role salary!");
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: "Please select a department this role belongs to.",
                    choices: departments
                }
            ])
            .then(answers =>{
                console.log(answers);
                addRoleDB(answers)
                    .then(() => console.log('Role is added!'))
                    .then(() => promptMenu());
            }); 
        })
}


promptMenu();

