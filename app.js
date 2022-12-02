var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nodemailer = require('nodemailer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var projectsRouter = require('./routes/projects');
var resumeRouter = require('./routes/resume');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//For Nodemailer and send e-mail from form (contact page)
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/projects', projectsRouter);
app.use("/resume", resumeRouter);

// use public folder
app.use(express.static('public'))

app.post('/contact', function(req, res, next) {
  console.log("This is a POST request for email")
  console.log(req.body);

  //donenv set up to read the nodemailer login information from the .env file
const dotenv = require('dotenv');
dotenv.config();

//nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.NMUSER}`,
      pass: `${process.env.NMPASS}`

    } 
  })

  //nodemailer will send me an email with the form information
  const mailOptions = {
    from: req.body.email,
    to: 'marcosdegoisborges@gmail.com',
    subject: 'Contact from portfolio',
    text: req.body.message
  }
  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log('Error Occurs');
      console.log(err);
    } else {
      console.log('Email sent');
      console.log(data);
    }
  }
  )
  res.redirect('/');
}
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
