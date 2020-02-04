const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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
  req.requestTime = new Date().toISOString();
  next();
});

// 3. Routes
app.use('/api/v1/products', productRouter);
//app.use('/api/v1/clients', clientRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find: ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
