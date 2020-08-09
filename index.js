const inquirer = require('inquirer');
const cTable = require('console.table');
const {viewAllDepartmentsDB, addDepartmentDB, viewAllRolesDB, addRoleDB, viewAllEmployeesDB, addEmployeeDB, updateEmployeeRoleDB} = require('./db/dbQueries');
const { values } = require('mysql2/lib/constants/charset_encodings');

const promptMenu = ()  => {
  
    console.log('\n******************************\n');
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        pageSize: 20,
        loop: false,
        choices: ['View all departments', 'Add a department', 'View all roles', 'Add a role', 'View all employees', 'Add an employee', 'Update an employee role', 'Quit']
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
        else if (action === 'View all employees'){
            viewAllEmployees();
        }
        else if (action === 'Add an employee'){
            addEmployee();
        }
        else if (action === 'Update an employee role'){
            updateEmployeeRole();
        }
        else if (action === 'Quit'){
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
};

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
};

//Roles
const viewAllRoles = () =>{
    viewAllRolesDB()
        .then(([rows]) =>{
            console.log('\n');
            console.table(rows);
        })
        .then(() => promptMenu());
};

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
                    pageSize: 20,
                    loop: false,
                    choices: departments
                }
            ])
            .then(answers =>{
                addRoleDB(answers)
                    .then(() => console.log('Role is added!'))
                    .then(() => promptMenu());
            }); 
        })
};

// Employee
const viewAllEmployees = () =>{
    viewAllEmployeesDB()
        .then(([rows]) =>{
            console.log('\n');
            console.table(rows);
        })
        .then(() => promptMenu());
};

const addEmployee = () =>{
    viewAllRolesDB()
        .then( ([rows]) =>{
            let roles = rows.map( ({title, role_id}) => ({
                name: title,
                value: role_id
            }));

            viewAllEmployeesDB()
                .then( ([rows]) =>{
                    let employees = rows.map( ({id, first_name, last_name}) => ({
                        name: first_name + ' ' + last_name,
                        value: id
                    }));
                    employees.unshift({ name: "None", value: null });

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'first_name',
                            message: "What is Employee's first name? (Required)",
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log(" Please enter Employee's first name!");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: "What is Employee's last name? (Required)",
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log(" Please enter Employee's last name!");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            pageSize: 20,
                            loop: false,
                             message: "Please select a role for this employee.",
                            choices: roles
                        },
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: "Please select who is an employee's manager.",
                            pageSize: 20,
                            loop: false,
                             choices: employees
                        }
                    ])
                    .then(
                        answers =>{
                            addEmployeeDB(answers)
                            .then(() => console.log('Employee is added!'))
                            .then(() => promptMenu());
                        }
                    );
                });
        })
};

const updateEmployeeRole = () => {
    viewAllRolesDB()
    .then( ([rows]) =>{
       let roles = rows.map( ({title, role_id}) => ({
           name: title,
           value: role_id
       }));

       viewAllEmployeesDB()
               .then( ([rows]) =>{
                   let employees = rows.map( ({id, first_name, last_name}) => ({
                       name: first_name + ' ' + last_name,
                       value: id
                   }));

                   inquirer.prompt([
                       {
                           type: 'list',
                           name: 'id',
                           message: "Please select an employee whose role you want to change.",
                           pageSize: 20,
                           loop: false,
                           choices: employees
                       },
                       {
                           type: 'list',
                           name: 'role_id',
                           pageSize: 20,
                           loop: false,
                           message: "Please select a new role for this employee.",
                           choices: roles
                       }
                   ])
                   .then(
                       answers =>{
                           updateEmployeeRoleDB([answers.role_id, answers.id])
                           .then(() => console.log("Employee's role is changed!"))
                           .then(() => promptMenu());
                       }
                   );
               });
   });
};


promptMenu();

