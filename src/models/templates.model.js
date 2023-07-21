const mongoose = require("mongoose");

const templateSchema = mongoose.Schema({
  title: {
    type: String,
  },
  subject: {
    type: String,
  },
  content: {
    type: String,
  },
  type: {
    type: Number,
    enum: [1, 2, 3], //1-->Whatsapp, 2-->Email,
    default: null,
  },
});

const templates = mongoose.model("templates", templateSchema);
module.exports = templates;
