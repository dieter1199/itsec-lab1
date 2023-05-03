const express = require('express');
const router = express.Router();

router.get('/secret', function(request, response) {
  response.render('secret');
});

module.exports = router;