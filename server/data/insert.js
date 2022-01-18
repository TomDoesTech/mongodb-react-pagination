const Product = require("../src/products");
const { connect, disconnect } = require("../src/db");
const products = require("./products");

async function run() {
  await connect();

  await Product.insertMany(products);

  await disconnect();

  process.exit(0);
}

run();
