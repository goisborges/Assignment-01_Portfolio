var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portfolio' });
});

// router.get('/about', function(req, res, next) {
//   // tell express to render an hbs view template
//   res.render('about', { title: 'About', email: 'goisborges@gmail.com' });
// })

module.exports = router;
