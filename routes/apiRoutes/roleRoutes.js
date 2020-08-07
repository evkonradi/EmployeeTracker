const express = require('express');
const router = express.Router();
const connection = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');

router.get('/roles', (req, res) => {
    const sql = `select title, role.id as role_id, name as department_name, salary
            from role inner join department 
            where role.department_id = department.id
            order by role.id;`;
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

router.post('/role', ({body}, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT INTO role SET ?;`;
    //const params = [body.title, body.salary, body.department_id];
    connection.query(sql, body, function(err, results) {
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

module.exports = router;