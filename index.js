const inquirer = require('inquirer');

const ViewAllEmployees = () =>{

};

const ViewAllDepartments = () =>{
    let queryUrl = 'http://localhost:3001/api/departments';

    fetch(queryUrl)
    .then(response => {
        if (!response.ok) {
            return alert('Error: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    });
};

const promptMenu = ()  => {
  
    console.log('\n******************************\n');

    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    })
    .then(({action})=>{
        if (action === 'View all employees'){
            ViewAllEmployees();
        }
        else if (action === 'View all departments'){
            ViewAllDepartments();
        };
    });
};

promptMenu();