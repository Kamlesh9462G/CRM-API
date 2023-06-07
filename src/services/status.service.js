const { status } = require("../models");
const addStatus = async (bodyData) => {
  return await status.create(bodyData);
};
const updateStatus = async (statusId, updateData) => {
  return await status.findOneAndUpdate(
    {
      _id: statusId,
    },
    updateData,
    { new: true }
  );
};
const deleteStatus = async (statusId) => {
  return await status.findOneAndDelete({
    _id: statusId,
  });
};
const getStatus = async (filter) => {
  return await status.find(filter);
};

module.exports = {
  addStatus,
  updateStatus,
  deleteStatus,
  getStatus,
};
