var express = require('express');
var router = express.Router();
const db = require('../helpers/db');
const session = require('../helpers/session')

router.get('/', async function(request, response, next) {

  // check if user is already logged in
  var user = await session.checkSessionId(request.cookies.sessionid);
  if (user == undefined) {  
    response.render('index', {
    loggedIn: false 
  });
  } else {
    request.session.user_id = user.id;
    response.redirect('/home');
  }

});


module.exports = router;
