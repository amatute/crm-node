const express = require('express');
const morgan = require('morgan');

const productRouter = require('./routes/productRoutes');
//const clientRouter = require('./routes/clientRoutes');

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

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3. Routes

app.use('/api/v1/products', productRouter);
//app.use('/api/v1/clients', clientRouter);

module.exports = app;
