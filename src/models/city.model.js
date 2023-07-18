const mongoose = require("mongoose");

const citySchema = mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    cityName: {
      type: String,
    },
  },
  { timestamps: true }
);

// citySchema.pre("save", async function (next) {
//   try {
//     const doc = this;
//     if (!doc.isNew) {
//       return next(); // Skip if the document is not new
//     }

//     const maxSerialNumber = await mongoose
//       .model("city")
//       .findOne()
//       .sort({ serialNumber: -1 })
//       .select("serialNumber")
//       .lean();

//     const nextSerialNumber = (maxSerialNumber?.serialNumber || 0) + 1;
//     doc.serialNumber = nextSerialNumber;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

const city = mongoose.model("city", citySchema);
module.exports = city;
