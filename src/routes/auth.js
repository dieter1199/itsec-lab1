const express = require('express');
const db = require('../helpers/db');
const router = express.Router();

/**
 * Login and logout routes/handlers.
 * The functions in this file are based on the examples from https://expressjs.com/en/resources/middleware/session.html
 */

/**
 * Login function
 */
router.post('/login', express.urlencoded({ extended: false }), function (req, res) {
  // login logic to validate req.body.user and req.body.pass
  // would be implemented here. for this example any combo works

  // TODO: You can insert an SQL query to validate the credentials here

  // regenerate the session, which is good practice to help
  // guard against forms of session fixation
  req.session.regenerate(function (err) {
    if (err) next(err);

    // store user information in session, typically a user id
    // also update the access to the user object in `isAuthenticated` and `logout` functions when chaning it here
    req.session.user = 'user identifier (for example id or email from database)';

    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });
});

/**
 * Logout function
 */
router.get('/logout', function (req, res, next) {
  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect('/');
    });
  });
});

module.exports = router;
