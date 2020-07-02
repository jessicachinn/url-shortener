const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: "",
  hash: "",
  shortenedUrl: "",
});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
