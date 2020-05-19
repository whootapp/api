const express = require('express');
const router = express.Router();
const pool = require('../../db');

// CREATE USER
router.put('/', async (req, res) => {
    try {
        const { user_name, first_name, last_name } = req.body;
        const response = await pool.query(
            'INSERT INTO "user"(user_name, first_name, last_name, date_joined)\
            VALUES($1, $2, $3, NOW())\
            RETURNING *', [user_name, first_name, last_name]
        );
        res.json(response.rows);
    }
    catch (error) {
        console.error(error.message);
    }
});

// GET ALL USERS (FOR DEBUGGING ONLY)
router.get('/', async (req, res) => {
    try {
        const response = await pool.query(
            'SELECT * FROM "user"'
        );
        res.json(response.rows);
    }
    catch (error) {
        console.error(error.message);
    }
});

// GET USER BY ID
router.get('/id/:id', async (req, res) => {
    try {
        const response = await pool.query(
            'SELECT * FROM "user" WHERE user_id = $1', [req.params.id]
        );
        res.json(response.rows);
    }
    catch (error) {
        console.error(error.message);
    }
});

// GET USER BY USERNAME
router.get('/username/:username', async (req, res) => {
    try {
        const response = await pool.query(
            'SELECT * FROM "user" WHERE user_name = $1', [req.params.username]
        );
        res.json(response.rows);
    }
    catch (error) {
        console.error(error.message);
    }
});

router.delete('/id/:id', async (req, res) => {
    try {
        const response = await pool.query(
            'DELETE FROM "user" WHERE user_id = $1 RETURNING *', [req.params.id]
        );
        res.json(response.rows);
    }
    catch (error) {
        console.error(error.message);
    }
});

module.exports = router;