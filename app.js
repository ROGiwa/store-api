require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connnectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('<h1> store API</h1><a href="api/v1/products">Products route</a>');
});

app.use('/api/v1/products', productsRouter);

//product routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect to DB
    await connnectDB();
    app.listen(port, console.log(`Server listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
