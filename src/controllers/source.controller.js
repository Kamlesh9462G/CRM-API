const mongoose = require("mongoose");
const sourceModel = require("../models/source.model");
const httpStatus = require("http-status");
const { sourceService } = require("../services");

const addSource = async (req, res) => {
  const addSource = await sourceService.addSource(req.body);
  return res.status(httpStatus.CREATED).json({
    message: "Source created successfully!!",
    Data: addSource,
  });
};
const updateSource = async (req, res) => {
  const updateSource = await sourceService.updateSource(
    req.params.id,
    req.body
  );
  return res.status(httpStatus.CREATED).json({
    message: "Source updated successfully!!",
    Data: updateSource,
  });
};
const deleteSource = async (req, res) => {
  const deleteSource = await sourceService.deleteSource(req.params.id);
  return res.status(httpStatus.CREATED).json({
    message: "Source deleted successfully!!",
    Data: deleteSource,
  });
};
const getSource = async (req, res) => {
  let filter = {};
  if (req.query._id) {
    filter["_id"] = req.query._id;
  }

  const source = await sourceService.getSource(filter);
  return res.status(httpStatus.CREATED).json({
    message: "success!!",
    Data: source,
  });
};
const getSourceById = async (req, res) => {
  try {
    const source = await sourceModel.findById(req.params.id);
    if (source) {
      res.json(source);
    } else {
      res.status(404).json({ message: "Source not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addSource,
  updateSource,
  deleteSource,
  getSource,
  getSourceById,
};
