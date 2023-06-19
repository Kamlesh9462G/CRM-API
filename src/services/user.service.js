const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { users } = require("../models");
const addUser = async (bodyData) => {

  let user = await users.findOne({ Email: bodyData.Email });
  if (user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `user already exists with email ${bodyData.Email}`
    );
  }
  return await users.create(bodyData);
  
};
const updateUser = async (userId, updateData) => {
  return await users.findOneAndUpdate(
    {
      _id: userId,
    },
    updateData,
    { new: true }
  );
};
const deleteUser = async (userId) => {
  return await users.findOneAndDelete({
    _id: userId,
  });
};
const getUsers = async (filter) => {
  return await users.find(filter);
};
const getUserByEmail = async (Email) => {
  return await users.findOne({ Email: Email });
};
const getUserById = async (userId) => {
  return await users.findOne({ _id: userId }).select({
    _id: 1,
    Name: 1,
    UserName: 1,
    Name: 1,
    appJtis: 1,
    appTypes: 1,
    pin: 1,
    role: 1,
    webJtis: 1,
    appJtis:1
  });;
};

const signOutUser = async (type, usreId) => {
  let obj = {}
  if (type == "web") {
    obj["isWebLoggedIn"] = false;
  }
  if (type == "app") {
        obj["isAppLoggedIn"] = false;
  }
  return await users.findOneAndUpdate({ _id: usreId }, obj);
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserByEmail,
  signOutUser,
  getUserById,
};
