const mongoose = require("mongoose");

const connectDB = url => mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connectDB;