const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/index');
const api = require('./routes/api');

const app = express();

const dbUrl = 'mongodb://localhost/yikkish';

mongoose.connect(dbUrl, { useMongoClient: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + dbUrl);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
app.use('/api', api);

const port = process.env.port | 3000;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});