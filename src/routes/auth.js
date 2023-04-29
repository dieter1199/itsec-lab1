const express = require('express');
const db = require('../helpers/db');
const router = express.Router();
const session = require('../helpers/session')



router.post('/login', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		let sql = `SELECT * FROM User WHERE username = '${username}' AND password = '${password}';`
		//let sql = "SELECT * FROM User WHERE username = '"+ username+"' AND password = '"+password+"';"
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.connection.query(sql, function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.user_id = results[0].id;	
				var sessionid = session.newSession(username);
				// set cookie
				response.cookie('sessionid', sessionid);
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});



router.get('/logout', function (req, res, next) {
	// add session id to db
	sql = "UPDATE User SET session=null WHERE id='" + req.session.user_id + "';";
	db.connection.query(sql, function (err, result) {
		if (err) throw err;
	});
	// delete cookies
	res.clearCookie("sessionid");

	req.session.user_id = null;
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
