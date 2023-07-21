const express = require("express");

const auth = require("../middlewares/auth");
const teplateController = require("../controllers/template.controller");

const router = express.Router();

router
  .route("/")
  .post(auth, teplateController.addTemplate)
  .get(auth, teplateController.getTemplates);

router
  .route("/:templateId")
  .put(auth, teplateController.updateTemplate)
  .delete(auth, teplateController.deleteTemplate);

module.exports = router;
