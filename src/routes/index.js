var express = require('express');
var router = express.Router();
const db = require('../helpers/db');

/* GET home page. */
router.get('/', function(request, response, next) {
    response.render('index', {
      loggedIn: request.session?.user != null,
      user: request.session?.user
    });
});

router.post("/home", (req, res) => {
  task = req.body.task
  s = "ongoing"
  let query = "INSERT INTO Todo (task, status) VALUES ('" + task + "', '" + s + "');"

  db.connection.query(query, function (err, result) {
      if (err) throw err;
      res.redirect('/home')
  });

})

router.get("/home/:id", (req, res) =>{
  let query = "DELETE FROM Todo WHERE task_id='" + req.params.id + "';"
  db.connection.query(query, function (err, result) {
    if (err) throw err;
    res.redirect('/home')
  });
})

router.get('/home', function(request, response, next) {
  let query = "SELECT * FROM Todo;"
  let items = []
  db.connection.query(query, function (err, result) {
    if (err) throw err;
    items = result
    console.log(items)
    response.render('index', {
      loggedIn: true,
      user: request.session?.user,
      items: items
    });
  });
});


router.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
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

module.exports = router;
