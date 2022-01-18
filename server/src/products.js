const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  productName: String,
  price: String,
  productAdjective: String,
  productMaterial: String,
  product: String,
});

const Product = mongoose.model("product", schema);

module.exports = Product;
