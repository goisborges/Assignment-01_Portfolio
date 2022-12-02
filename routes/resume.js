var express = require('express');
var router = express.Router();

/* GET about page. */
//router are already registered to a specific route
//intention is to register this object to '/about' route
router.get('/', function (req, res, next) {
    // tell express to render an hbs view template
    // res.render('resume', { title: 'My Resume' });
    res.sendFile("de Gois Borges, Marcos - resume general.docx", { root: __dirname + '/../public/assets/'})
})

module.exports = router;
