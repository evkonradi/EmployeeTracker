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
    const sql = `select id as department_id, name as department_name from department order by id;`;
    return connection.promise().query(sql);
};

module.exports = {viewAllDepartmentsDB, addDepartmentDB};