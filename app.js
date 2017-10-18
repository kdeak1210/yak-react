const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sessions = require('client-sessions');

// Set up and connect to mongodb through mongoose
const dbUrl = 'mongodb://localhost/yikkish';
mongoose.connect(dbUrl, { useMongoClient: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + dbUrl);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

// Bring in our routes (index and API)
const routes = require('./routes/index');
const api = require('./routes/api');
const account = require('./routes/account');

// Initialize the express app
const app = express();

// Set the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set up some middleware - morgan, body + cookie parsers, static files
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sessions({
  // Every request will have an object called session, stored as cookie
  cookieName: 'session',
  secret: 'jkdfgjkd',
  duration: 24*60*60*1000, // 1 day (valid length of session: microsecond)
  activeDuration: 30*60*1000
}));

// Serve pages in public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/account', account);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const port = process.env.PORT | 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;