
require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
require('./src/mongoose').initMongoose(dbUrl);

const initAuth = require('./src/auth').initAuth;
initAuth(app);

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const articlesRouter = require('./routes/articles');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/articles', articlesRouter);

require('./src/apidocs')(app);


// Static has to be after all routes
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function(err, req, res) {

  res.status(err.status || 500);
  if ( req.app.get('env') === 'development' )
    res.send(err);
  else
    res.send();
});

module.exports = app;
