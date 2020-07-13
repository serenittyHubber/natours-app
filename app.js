const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss-clean');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'This IP has dot too many requests',
});
app.use(
  hpp({
    whitelist: ['duration'],
  })
);
app.use('/api', limiter);

app.use(
  express.json({
    limit: '10kb',
  })
);
app.use(mongoSanitize());
app.use(xss());
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`This url doesn't exist ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
