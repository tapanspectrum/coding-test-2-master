const express = require('express');

const routes = require('./routes');
const { ValidationError, NotFoundError } = require('./lib/errors');
const dbconnect = require('./config/mongoose.connect');
// const variable
const port = 3000;
const app = express();


// dbconnect.dbinit();

app.use(express.json({ limit: '100kb' }));
app.use('/', routes);
app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});

module.exports = app;

app.listen(port, () => {
  console.log(`Server start with port ${port}`);
});