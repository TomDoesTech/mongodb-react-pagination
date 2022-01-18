const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.connect("mongodb://localhost:27017/pagination");
    console.log("Connected to DB");
  } catch (e) {
    console.error("Could not connect to DB");
    process.exit(1);
  }
}

async function disconnect() {
  await mongoose.connection.close();
  return;
}

module.exports = { connect, disconnect };
