const express = require('express');
const router = express.Router();
const connection = require('../../db/database');

router.get('/departments', (req, res) => {
    const sql = `select name as department_name, id as department_id from department order by name;`;
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

router.post('/department', ({body}, res) => {
    const sql = `INSERT INTO department(name) VALUES (?);`;
    const params = [body.name];
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

module.exports = router;