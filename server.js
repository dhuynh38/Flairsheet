// Variable Declarations
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const api = require('./server/routes/api');
const app = express();
const port = process.env.PORT || '3000';
const http = require('http');
const server = http.createServer(app);

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useMongoClient: true
});

// Connecting to the database
connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => {
  console.log(err);
});

// Set up logger and parsers
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Set up api locatoin
app.use('/api', api);

// Send all other requests to the angular app
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Setting the port
app.set('port', port);

// Tell the server to listen on specified port
server.listen(port, () => {
    console.log(`Running on localhost:${port}`);
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;