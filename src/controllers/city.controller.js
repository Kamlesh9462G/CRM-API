const mongoose = require("mongoose");
const cityModel = require("../models/city.model");
const httpStatus = require("http-status");
const { cityService } = require("../services");
const catchAsync = require('../utils/catchAsync')
const addCity = catchAsync(async (req, res) => {
  const city = await cityService.addCity(req.body);

  return res.status(httpStatus.CREATED).json({
    message: "city added succssfully!!",
    Data: city,
  });
});
const updateCity = catchAsync(async (req, res) => {
  const city = await cityService.updateCity(req.params.id, req.body);

  return res.status(httpStatus.OK).json({
    message: "city updated succssfully!!",
    Data: city,
  });
});
const deleteCity = catchAsync(async (req, res) => {
  const city = await cityService.deleteCity(req.params.id);

  return res.status(httpStatus.OK).json({
    message: "city deleted succssfully!!",
    Data: city,
  });
});
const getCity = catchAsync(async (req, res) => {
  let filter = {};
  if (req.query._id) {
    filter["_id"] = req.query._id;
  }
  const city = await cityService.getCity(filter);

  return res.status(httpStatus.OK).json({
    message: "city",
    Data: city,
  });
});
const getCityById = catchAsync(async (req, res) => {
  try {
    const city = await cityModel.findById(req.params.id);
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ message: "City not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  addCity,
  updateCity,
  deleteCity,
  getCity,
  getCityById,
};
