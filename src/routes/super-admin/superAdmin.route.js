const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth");

const superAdminController = require("../../controllers/superAdmin/superAdmin.controller");

router.use("/",auth, superAdminController.getAllAdmins);

module.exports = router;
