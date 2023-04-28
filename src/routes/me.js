const express = require('express');
const db = require('../helpers/db');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');

/*
 * Example page to show how checking the authentication works
 */

/**
 * Returns information about the logged in user.
 * 
 * Uses the `isAuthenticated` middleware to verify if a user is authenticated.
 */
router.get('/', isAuthenticated, async function(request, response, next) {
    response.send(`Hi, ${request.session.user}`);
});

module.exports = router;
