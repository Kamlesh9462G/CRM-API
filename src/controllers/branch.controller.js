const mongoose = require("mongoose");
const branchModel = require("../models/branch.model");
const httpStatus = require("http-status");
const { branchService } = require("../services");

const addBranch = async (req, res) => {
  const branch = await branchService.addBranch(req.body);

  return res.status(httpStatus.CREATED).json({
    message: "branch added succssfully!!",
    Data: branch,
  });
};
const updateBranch = async (req, res) => {
  const branch = await branchService.updateBranch(
    req.params.id,
    req.body
  );

  return res.status(httpStatus.OK).json({
    message: "branch updated succssfully!!",
    Data: branch,
  });
};
const deleteBranch = async (req, res) => {
  const branch = await branchService.deleteBranch(req.params.id);

  return res.status(httpStatus.OK).json({
    message: "branch deleted succssfully!!",
    Data: branch,
  });
};
const getBranch = async (req, res) => {
  let filter = {};
  if (req.query._id) {
    filter["_id"] = req.query._id;
  }
  const branch = await branchService.getBranch(filter);

  return res.status(httpStatus.OK).json({
    message: "branch",
    Data: branch,
  });
};

const getBranchById = async (req, res) => {
  try {
    const branch = await branchModel.findById(req.params.id);
    if (branch) {
      res.json(branch);
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addBranch,
  updateBranch,
  deleteBranch,
  getBranch,
  getBranchById,
};
