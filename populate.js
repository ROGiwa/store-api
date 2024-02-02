require('dotenv').config();
const connectDB = require('./db/connect');
const products = require('./models/product');
const productsJSON = require('./products.json');

const start = async () => {
  try {
    //connect to DB
    await connectDB();
    await products.deleteMany();
    await products.create(productsJSON);
    console.log('Products inserted');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
