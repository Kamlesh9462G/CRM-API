const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService, tokenService } = require("../services");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendGreetingEmailToUser } = require("../utils/sendEmail");

const addUser = catchAsync(async (req, res) => {
  if (req.user.UserType == 3 || req.user.UserType == 1) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "permission denied",
    });
  }
  const { Email } = req.body;
  const user = await userService.getUserByEmail(Email);
  if (user) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: `user already exists with this email: ${Email}`,
    });
  }
  //req.body['image'] = req.file.location;
  req.body["UserType"] = 3;
  req.body["Permission"] = req.body.Permission;
  req.body["parentId"] = req.user.userId;
  req.body["Password"] = "user@123";
  const addUser = await userService.addUser(req.body);

  let setNewPasswordToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(setNewPasswordToken, Number(10));

  let tokenPayload = {
    userId: addUser._id,
    token: hash,
    createdAt: Date.now(),
  };
  await tokenService.createSetOrForgotPwdToken(tokenPayload);

  let link = `http://localhost:8085/passwordReset?token=${setNewPasswordToken}&id=${addUser._id}`;

  const emailData = {
    name:addUser.Name,
    link:link
  }
  const subject = "Welcome to Our Lead Management System! Password Update Required.!"
  await sendGreetingEmailToUser(addUser.Email,subject,'user-welcome',emailData);
  // await sendGreetingEmailToUser({
  //   email: addUser.Email,
  //   subject: `Welcome to Our Lead Management System! Password Update Required.`,
  //   htmlMsg,
  // });
  return res.status(httpStatus.CREATED).json({
    message: "User created successfully!!",
    Data: addUser,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const updateUser = await userService.updateUser(req.params.id, req.body);
  return res.status(httpStatus.CREATED).json({
    message: "User updated successfully!!",
    Data: updateUser,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const deleteUser = await userService.deleteUser(req.params.userId);
  return res.status(httpStatus.CREATED).json({
    message: "User deleted successfully!!",
    Data: deleteUser,
  });
});
const getUsers = catchAsync(async (req, res) => {
  let filter = {};
  filter["UserType"] = 3;

  if (req.query._id) {
    filter["_id"] = req.query._id;
  }
  // [
  //   {
  //     $match: {
  //       _id: {
  //         $in: [
  //           new ObjectId("64722ba764fa168d27a82ea1"),
  //           new ObjectId("64722bcc64fa168d27a82ea6"),
  //         ],
  //       },
  //     },
  //   },
  // ];
  if (req.user.UserType == 2) {
    filter["parentId"] = new ObjectId(req.user.userId);
  }
  if (req.user.UserType == 3) {
    filter["userId"] = new ObjectId(req.user._id);
    filter["parentId"] = new ObjectId(req.user.parentId);
  }
  // if (req.user.userType == 3) {
  //   let arr = [];
  //   arr.push(new ObjectId(req.user._id));
  //   if (req.user.Permission.length == 0) {
  //     arr.push(new ObjectId(req.user._id));
  //   }
  //   if (req.user.Permission.length > 0) {
  //     for (let permissionId of req.user.Permission) {
  //       arr.push(new ObjectId(permissionId));
  //     }
  //   }
  //   filter["_id"] = {
  //     "$in":arr
  //   }
  // }

  const users = await userService.getUsers(filter);
  return res.status(httpStatus.CREATED).json({
    message: "success!!",
    Data: users,
  });
});
const getUserById = catchAsync(async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
};
