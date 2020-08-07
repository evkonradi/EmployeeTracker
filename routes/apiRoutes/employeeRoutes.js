const express = require('express');
const router = express.Router();
const connection = require('../../db/database');

router.get('/employees', (req, res) => {
    const sql = `select employee.id as id, employee.first_name, employee.last_name, title, name as department, salary, 
	        concat(employee2.first_name, ' ', employee2.last_name) as manager
            from employee inner join role on employee.role_id = role.id
            inner join department on department_id = department.id
            left outer join employee as employee2 on employee.manager_id = employee2.id;`;
    const params = [];
    connection.query(sql, params, function(err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
      
        res.json({
            message: 'success',
            data: results
        });
    });
});

module.exports = router;