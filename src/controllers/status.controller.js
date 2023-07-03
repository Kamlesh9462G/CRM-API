const mongoose = require("mongoose");
const statusModel = require("../models/status.model");
const httpStatus = require("http-status");
const { statusService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const addStatus = catchAsync(async (req, res) => {
  const status = await statusService.addStatus(req.body);

  return res.status(httpStatus.CREATED).json({
    message: "status added succssfully!!",
    Data: status,
  });
});
const updateStatus = catchAsync(async (req, res) => {
  const status = await statusService.updateStatus(req.params.id, req.body);

  return res.status(httpStatus.OK).json({
    message: "status updated succssfully!!",
    Data: status,
  });
});
const deleteStatus = catchAsync(async (req, res) => {
  const status = await statusService.deleteStatus(req.params.id);

  return res.status(httpStatus.OK).json({
    message: "status deleted succssfully!!",
    Data: status,
  });
});
const getStatus = catchAsync(async (req, res) => {
  let filter = {};
  if (req.query._id) {
    filter["_id"] = req.query._id;
  }
  const status = await statusService.getStatus(filter);

  return res.status(httpStatus.OK).json({
    message: "status",
    Data: status,
  });
});
const getStatusById = catchAsync(async (req, res) => {
  try {
    const status = await statusModel.findById(req.params.id);
    if (status) {
      res.json(status);
    } else {
      res.status(404).json({ message: "Status not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  addStatus,
  updateStatus,
  deleteStatus,
  getStatus,
  getStatusById,
};
