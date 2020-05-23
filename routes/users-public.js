const express = require('express')
const router = express.Router()
const pool = require('../db')
const { WhootError } = require('../errors')

/** PUBLIC API ENDPOINTS **/

/** Create New User
 *  Given a username, first name, and last name, create a user
 *  with an auto-generated ID and specified information.
 */
router.put('/', (req, res, next) => {
  // Request body containing the user info
  const user = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }
  pool.query(
    'INSERT INTO "user"(user_name, first_name, last_name, date_joined) ' +
    'VALUES($1, $2, $3, NOW()) ' +
    'RETURNING *',
    [user.username, user.first_name, user.last_name]
  )
    .then((output) => {
      res.status(201).json(output.rows[0])
    })
    .catch((error) => {
      res.status(500).json(WhootError(error))
    })
})

/** Get User by ID
 *  Given an ID, get all of the user's information
 */
router.get('/id/:id', (req, res, next) => {
  pool.query(
    'SELECT * FROM "user" WHERE user_id = $1', [req.params.id]
  )
    .then((output) => {
      if (output.rows.length > 0) {
        res.status(200).json(output.rows[0])
      } else {
        res.status(404).json(
          WhootError(`User with ID '${req.params.id}' does not exist.`)
        )
      }
    })
    .catch((error) => {
      res.status(500).json(WhootError(error))
    })
})

/** Get User by Username
 *  Given a username, get all of the user's information
 */
router.get('/username/:username', (req, res, next) => {
  pool.query(
    'SELECT * FROM "user" WHERE user_name = $1', [req.params.username]
  )
    .then((output) => {
      if (output.rows.length > 0) {
        res.status(200).json(output.rows[0])
      } else {
        res.status(404).json(
          WhootError(`User with username '${req.params.username}' not found.`)
        )
      }
    })
    .catch((error) => {
      res.status(500).json(WhootError(error))
    })
})

module.exports = router
