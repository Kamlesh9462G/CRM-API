const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branch.controller");
const validate = require("../middlewares/validate");
const branchValidation = require("../validations/branch.validation");
const auth = require("../middlewares/auth");

router.get("/",auth, branchController.getBranch);
router.post("/",auth, branchController.addBranch);

router.get("/:id",auth, branchController.getBranchById);
router.put(
  "/:id",
  auth,
  branchController.updateBranch
);
router.delete(
  "/:id",
  auth,
  branchController.deleteBranch
);

module.exports = router;
