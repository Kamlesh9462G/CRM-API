const { users } = require("../models");
const {ObjectId} = require('mongodb')
const getProfile = async (userId) => {
  return await users.aggregate([
    {
      $match: {
        _id: new ObjectId(userId),
      },
    },
    {
      $project: {
        Name: 1,
        UserName: 1,
        Email: 1,
      },
    },
  ]);
};
module.exports = {
  getProfile,
};
