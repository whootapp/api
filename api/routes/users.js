const express = require('express');
const router = express.Router();
const pool = require('../../db');
const { WhootError } = require('../../errors');

// CREATE USER
router.put('/', (req, res, next) => {
    const user = {
        user_name: req.body.user_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }
    pool.query(
        'INSERT INTO "user"(user_name, first_name, last_name, date_joined)\
        VALUES($1, $2, $3, NOW())\
        RETURNING *', [user.user_name, user.first_name, user.last_name]
    )
    .then((response) => {
        res.status(201).json(response.rows[0]);
    })
    .catch((error) => {
        res.status(500).json(WhootError(error));
    });
});

// GET ALL USERS (FOR DEBUGGING ONLY)
router.get('/', async (req, res, next) => {
    try {
        const response = await pool.query(
            'SELECT * FROM "user"'
        );
        res.status(200).json(response.rows);
    }
    catch (error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        })
    }
});

// GET USER BY ID
router.get('/id/:id', async (req, res, next) => {
    pool.query(
        'SELECT * FROM "user" WHERE user_id = $1', [req.params.id]
    )
    .then((response) => {
        if (response.rows.length > 0) {
            res.status(200).json(response.rows[0]);
        }
        else {
            res.status(404).json(
                WhootError('User with specified ID not found.')
            );
        }
    })
    .catch((error) => {
        res.status(500).json(WhootError(error));
    })
});

// GET USER BY USERNAME
router.get('/username/:username', async (req, res, next) => {
    pool.query(
        'SELECT * FROM "user" WHERE user_name = $1', [req.params.username]
    )
    .then((response) => {
        if (response.rows.length > 0) {
            res.status(200).json(response.rows[0]);
        }
        else {
            res.status(404).json(
                WhootError('User with specified username not found.')
            );
        }
    })
    .catch((error) => {
        res.status(500).json(WhootError(error));
    })
});

router.delete('/id/:id', async (req, res, next) => {
    try {
        const response = await pool.query(
            'DELETE FROM "user" WHERE user_id = $1 RETURNING *', [req.params.id]
        );
        res.json(response.rows[0]);
    }
    catch (error) {
        console.error(error.message);
    }
});

module.exports = router;