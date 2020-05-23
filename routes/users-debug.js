const express = require('express')
const router = express.Router()
const pool = require('../db')
const { WhootError } = require('../errors')

/** DEBUGGING ENDPOINTS **/

/** Get All Users */
router.get('/', (req, res, next) => {
  pool.query(
    'SELECT * FROM "user"'
  )
    .then((output) => {
      res.status(200).json(output.rows)
    })
    .catch((error) => {
      res.status(500).json(WhootError(error))
    })
})

/* Permanently Delete User */
router.delete('/delete/:id', (req, res, next) => {
  const userId = req.params.id
  pool.query(
    'DELETE FROM "user" WHERE user_id = $1 RETURNING *', [userId]
  )
    .then((output) => {
      if (output.rows.length > 0) {
        res.status(200).json(output.rows[0])
      } else {
        res.status(404).json(WhootError(
                `User with ID '${userId}' does not exist.`
        ))
      }
    })
    .catch((error) => {
      console.error(error.message)
      res.status(500).json(WhootError(error))
    })
})

module.exports = router
