const express = require('express')
const router = express.Router()
const pool = require('../db')
const { WhootError } = require('../errors')

/** PRIVATE ENDPOINTS **/

/** Deactivate User by ID
  * Given a User ID of an active account, mark the account as deleted.
  * This will allow the user to change their mind and reactivate in
  * the future.
  */
router.patch('/deactivate/:id', (req, res, next) => {
  const userId = req.params.id

  pool.query(
    'UPDATE "user" SET date_deleted = NOW() WHERE user_id = $1 ' +
    'AND date_deleted IS NULL RETURNING date_deleted',
    [userId]
  )
    .then((output) => {
      if (output.rows.length > 0) {
        res.status(200).json({
          success: {
            message: `User with ID ${userId} successfully marked for deletion.`,
            date_deleted: output.rows[0]
          }
        })
      } else {
        res.status(400).json(
          WhootError(
                  `User with ID '${userId}' does not exist or is already deactivated.`)
        )
      }
    })
    .catch((error) => {
      res.status(500).json(WhootError(error))
    })
})

/** Reactivate User by ID
  * Given a User ID of a deactivated account, reactivate the account.
  */
router.patch('/reactivate/:id', (req, res, next) => {
  pool.query(
    'UPDATE "user" SET date_deleted = NULL WHERE user_id = $1 ' +
    'AND date_deleted IS NOT NULL RETURNING date_deleted',
    [req.params.id]
  )
    .then((output) => {
      if (output.rows.length > 0) {
        res.status(200).json({
          success: {
            message: `User with ID '${req.params.id}' successfully reactivated.`
          }
        })
      } else {
        res.status(400).json(
          WhootError(
                  `User with ID '${req.params.id}' does not exist or is already activated.`
          )
        )
      }
    })
    .catch((error) => {
      res.status(500).json(WhootError(error))
    })
})

module.exports = router
