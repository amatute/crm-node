const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION 🔥 Shooting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DB_URI.replace(
  '<PASSWORD>',
  process.env.MONGO_DB_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected 😊'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err);
  console.log('UNHANDLED REJECTION 🔥 Shooting down.');
  server.close(() => {
    process.exit(1);
  });
});
