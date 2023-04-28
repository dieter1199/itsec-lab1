const express = require('express');

/**
 * Middleware function to check whether a user is authenticated.
 * Returns 401 (Unauthorized) if user is not logged in.
 * 
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function isAuthenticated (req, res, next) {
  if (req.session.user != null) {
    // Continue with next middleware or call actual handler for the route
    next();
  }
  else {
    // Not authenticated
    res.sendStatus(401);
  }
}

module.exports = {
  isAuthenticated
};
