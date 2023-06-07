const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    expires: {
      type: Date,
      //required: true,
    },
  },
  {
    timestamps: true,
  }
);
const token = mongoose.model("tokens", tokenSchema);

module.exports = token;
