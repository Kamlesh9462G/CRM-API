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
  console.log(filter);
  //return await users.find(filter);
  return await users.aggregate([
    {
      $match: {
        UserType: 3,
      },
    },
    {
      $project: {
        parentId: 1,
        userId: 1,
        companyName: 1,
        Name: 1,
        UserName: 1,
        Email: 1,
        Phone: 1,
        City: 1,
        active: 1,
        UserType: 1,
      },
    },
  ]);
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
    appJtis: 1,
  });
};

const signOutUser = async (type, usreId) => {
  let obj = {};
  if (type == "web") {
    obj["isWebLoggedIn"] = false;
  }
  if (type == "app") {
    obj["isAppLoggedIn"] = false;
  }
  return await users.findOneAndUpdate({ _id: usreId }, obj);
};

const getAllAdmins = async () => {
  return await users.aggregate([
    {
      $match: {
        UserType: 2,
      },
    },
    {
      $project: {
        parentId: 1,
        userId: 1,
        companyName: 1,
        Name: 1,
        UserName: 1,
        Email: 1,
        Phone: 1,
        City: 1,
        active: 1,
      },
    },
  ]);
};
const getAllAdminsNew = async () => {
  return await users.aggregate([
    {
      $match: {
        UserType: {
          $in: [2, 3],
        },
      },
    },
    {
      $project: {
        _id: 1,
        parentId: 1,
        userId: 1,
        companyName: 1,
        Name: 1,
        UserName: 1,
        UserType: 1,
        Email: 1,
        Phone: 1,
        City: 1,
        active: 1,
      },
    },
    {
      $lookup: {
        from: "users",
        let: {
          parentId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$parentId", "$$parentId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              parentId: 1,
              userId: 1,
              companyName: 1,
              Name: 1,
              UserName: 1,
              UserType: 1,
              Email: 1,
              Phone: 1,
              City: 1,
              active: 1,
            },
          },
        ],
        as: "users",
      },
    },
    {
      $match: {
        UserType: 2,
      },
    },
  ]);
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserByEmail,
  signOutUser,
  getUserById,
  getAllAdmins,
  getAllAdminsNew
};
