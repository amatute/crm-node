const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. Middelwares

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the Middleware! ✌');

  next();
});

module.exports = app;
