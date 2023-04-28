const express = require('express');
const db = require('../helpers/db');
const router = express.Router();

/**
 * Returns the users on the database.
 * 
 * This is an example function to show you how to handle requests and send queries to the database.
 * This does NOT count as vulnerability.
 */
router.get('/', async function(request, response, next) {
  // Wait for the result from the DB
  // (note that using `await` requires the function where the `await` is used in to be `async`)
  res = await db.query('SELECT * FROM users').catch(() => {
    // Error querying the DB
    response.sendStatus(500);
  });

  // Only continue if query was successful
  if (res == null) {
    // Because of the error we catched above, we have no data to process
    // in the rest of this function --> return
    return;
  }

  response.send(res);
});

module.exports = router;
