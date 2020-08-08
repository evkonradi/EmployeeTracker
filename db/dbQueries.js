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
    console.log(params);
    const sql = `INSERT INTO role SET ?;`;
    return connection.promise().query(sql, params);
}

module.exports = {viewAllDepartmentsDB, addDepartmentDB, viewAllRolesDB, addRoleDB};