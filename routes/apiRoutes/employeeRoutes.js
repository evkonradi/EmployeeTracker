const express = require('express');
const router = express.Router();
const connection = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');

router.get('/employees', (req, res) => {
    const sql = `select employee.id as id, employee.first_name, employee.last_name, title, name as department, salary, 
	        concat(employee2.first_name, ' ', employee2.last_name) as manager
            from employee inner join role on employee.role_id = role.id
            inner join department on department_id = department.id
            left outer join employee as employee2 on employee.manager_id = employee2.id
            order by employee.id;`;
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

router.post('/employee', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    connection.query(sql, params, function(err, results) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
      
        res.json({
            message: 'success',
            data: body,
            id: this.lastID
        });
    });
});

router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'role_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `UPDATE employee SET ROLE_ID = ? WHERE ID = ?;`;
    const params = [req.body.role_id, req.params.id];
    connection.query(sql, params, function(err, results) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
      
        res.json({
            message: 'success',
            data: req.body,
            affectedRows: res.affectedRows,
            changes: this.changes
        });
    });
});


module.exports = router;