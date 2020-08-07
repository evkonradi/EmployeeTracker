const express = require('express');
const router = express.Router();
const connection = require('../../db/database');

router.get('/roles', (req, res) => {
    const sql = `select title, id as role_id, name as department_name, salary
            from role inner join department 
            where role.department_id = department.id
            order by id;`;
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