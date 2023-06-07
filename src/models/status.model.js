const mongoose = require("mongoose");

const statusSchema = mongoose.Schema(
  {
    serialNumber: {
      type: Number,
      unique: true,
    },
    StatusName: {
      type: String,
    },
  },
  { timestamps: true }
);

statusSchema.pre("save", async function (next) {
  try {
    const doc = this;
    if (!doc.isNew) {
      return next(); // Skip if the document is not new
    }

    const maxSerialNumber = await mongoose
      .model("status")
      .findOne()
      .sort({ serialNumber: -1 })
      .select("serialNumber")
      .lean();

    const nextSerialNumber = (maxSerialNumber?.serialNumber || 0) + 1;
    doc.serialNumber = nextSerialNumber;
    return next();
  } catch (err) {
    return next(err);
  }
});

const status = mongoose.model("status", statusSchema);
module.exports = status;
