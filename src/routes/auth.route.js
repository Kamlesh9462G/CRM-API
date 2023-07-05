const express = require("express");
const router = express.Router();

const { profileImage } = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const {authValidation} = require('../validations')
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");

router.post(
  "/signup",
  //    profileImage.single('file'),
  validate(authValidation.registerAdmin),
  authController.signupAdmin
);

router.post("/signin", authController.signIn);
router.post("/signout", auth, authController.signout);

router.post("/pin", auth, authController.createPin);
router.post("/login-with-pin", authController.loginWithPin);
router.post("/request-forgot-password", authController.requestForgotPassword);
router.post("/forgot-password", authController.ForgotPassword);

// router.route("/pin").post(protect, createPin);
// router.route("/login-with-pin").post(loginWithPin);

module.exports = router;
