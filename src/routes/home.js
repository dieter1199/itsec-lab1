var express = require('express');
var router = express.Router();
const db = require('../helpers/db');
const session = require('../helpers/session')


router.post("/home", async(req, res) => {

  // check if user is already logged in
  var user = await session.checkSessionId(req.cookies.sessionid);
  if (user == undefined) {  
    res.redirect('/');
  } else {
    task = req.body.task
    s = "ongoing"
    let query = "INSERT INTO Todo (task, status, user_id) VALUES ('" + task + "', '" + s + "', '" + req.session.user_id + "');"
  
    db.connection.query(query, function (err, result) {
        if (err) throw err;
        res.redirect('/home')
    });
  }

})

router.get("/home/:id", async (req, res) =>{

  // check if user is already logged in
  var user = await session.checkSessionId(req.cookies.sessionid);
  if (user == undefined) {  
    res.redirect('/');
  } else {
    let query = "DELETE FROM Todo WHERE task_id='" + req.params.id + "';"
    db.connection.query(query, function (err, result) {
      if (err) throw err;
      res.redirect('/home')
    });
  }

})

router.get('/home', async function(request, response, next) {


  // check if user is already logged in
  var user = await session.checkSessionId(request.cookies.sessionid);
  if (user == undefined) {  
    response.redirect('/');
  } else {
    let query = "SELECT * FROM Todo WHERE user_id='" + request.session.user_id + "';"
    let items = []
    db.connection.query(query, function (err, result) {
      if (err) throw err;
      items = result
      response.render('index', {
        loggedIn: true,
        items: items
      });
    });
  }

});


module.exports = router;
