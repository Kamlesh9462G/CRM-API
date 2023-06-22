const express = require("express");
const router = express.Router();

const superAdminController = require("../../controllers/superAdmin/superAdmin.controller");

router.use("/", superAdminController.getAllAdmins);

module.exports = router;
