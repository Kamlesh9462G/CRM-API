const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    // serialNumber: {
    //   type: Number,
    //   unique: true,
    // },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      default: null,
    },
    companyName: {
      type: String,
      unique: true,
    },
    Name: {
      type: String,
    },
    UserName: {
      type: String,
    },
    UserType: {
      type: Number,
      enum: [1, 2, 3], //1==>super admin,2==>admin,3==>user
      default: null,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
    PasswordUpdatedAt: {
      type: Date,
      default: Date.now(),
    },
    appTypes: {
      type: [String],
      enum: ["web", "app"],
      default: [],
    },
    appJtis: {
      type: [String],
      default: [],
    },
    webJtis: {
      type: [String],
      default: [],
    },
    Phone: {
      type: String,
    },
    Image: {
      type: String,
    },
    role: {
      type: String,
    },
    Branch: {
      type: Array,
    },
    Permission: [{ type: mongoose.Schema.Types.ObjectId }],
    City: {
      type: String,
    },
    menuPermissions: {
      type: Array,
    },
    Address: {
      type: String,
    },
    teamSize: {
      type: Number,
    },
    numberOfUsers: {
      type: Number,
    },
    validupTo: {
      type: Date,
    },
    webURL: {
      type: String,
    },
    currentStatus: {
      type: String,
    },
    image: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    pin: {
      type: String,
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   try {
//     const doc = this;
//     if (!doc.isNew) {
//       return next(); // Skip if the document is not new
//     }

//     const maxSerialNumber = await mongoose
//       .model("user")
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

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("Password")) return next();
  const hash = await bcrypt.hash(user.Password, 10);
  user.Password = hash;
  next();
});

const users = mongoose.model("user", userSchema);
module.exports = users;
