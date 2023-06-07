const { city } = require("../models");
const addCity = async (bodyData) => {
  return await city.create(bodyData);
};
const updateCity = async (cityId, updateData) => {
  return await city.findOneAndUpdate(
    {
      _id: cityId,
    },
    updateData,
    { new: true }
  );
};
const deleteCity = async (cityId) => {
  return await city.findOneAndDelete({
    _id: cityId,
  });
};
const getCity = async (filter) => {
  return await city.find(filter);
};

module.exports = {
  addCity,
  updateCity,
  deleteCity,
  getCity,
};
