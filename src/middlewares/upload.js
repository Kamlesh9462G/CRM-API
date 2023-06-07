require("dotenv").config();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require('path')
const s3Config = new AWS.S3({
  accessKeyId: "AKIA5BXOBPR54N775NW4",
  secretAccessKey: "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",
  Bucket: 'crm-test-new',
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: 'crm-test-new',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: multerS3Config,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
  },
});


exports.profileImage = upload;