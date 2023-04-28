var express = require('express');
var router = express.Router();
const db = require('../helpers/db');


router.post("/home", (req, res) => {
  task = req.body.task
  s = "ongoing"
  let query = "INSERT INTO Todo (task, status, user_id) VALUES ('" + task + "', '" + s + "', '" + req.session.user_id + "');"

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
  let query = "SELECT * FROM Todo WHERE user_id='" + request.session.user_id + "';"
  let items = []
  db.connection.query(query, function (err, result) {
    if (err) throw err;
    items = result
    response.render('index', {
      loggedIn: request.session.loggedin,
      items: items
    });
  });
});


module.exports = router;
