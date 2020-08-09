const connection = require('./database');

// Department
const viewAllDepartmentsDB = () =>{
    const sql = `select id as department_id, name as department_name from department order by id;`;
    return connection.promise().query(sql);
};

const addDepartmentDB = (params) =>{
    const sql = `INSERT INTO department(name) VALUES (?);`;
    return connection.promise().query(sql, params);
}

// Roles
const viewAllRolesDB = () =>{
    const sql = `select title, role.id as role_id, name as department_name, salary
        from role inner join department 
        where role.department_id = department.id
        order by role.id;`;
    return connection.promise().query(sql);
};

const addRoleDB = (params) =>{
    const sql = `INSERT INTO role SET ?;`;
    return connection.promise().query(sql, params);
}

//Employee
const viewAllEmployeesDB = () =>{
    const sql = `select employee.id as id, employee.first_name, employee.last_name, title, name as department, salary, 
        concat(employee2.first_name, ' ', employee2.last_name) as manager
        from employee inner join role on employee.role_id = role.id
        inner join department on department_id = department.id
        left outer join employee as employee2 on employee.manager_id = employee2.id
        order by employee.id;`;
    return connection.promise().query(sql);
};

const addEmployeeDB = (params) =>{
    const sql = `INSERT INTO employee SET ?;`;
    return connection.promise().query(sql, params);
}

const updateEmployeeRoleDB = (params) =>{
    const sql = `UPDATE employee SET ROLE_ID = ? WHERE ID = ?;`;
    return connection.promise().query(sql, params);
}


module.exports = {viewAllDepartmentsDB, addDepartmentDB, viewAllRolesDB, addRoleDB, viewAllEmployeesDB, addEmployeeDB, updateEmployeeRoleDB};