const { authService, userService, tokenService } = require("../services");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { users, loginLogs } = require("../models");
const ApiError = require("../utils/ApiError");
const { sendEmail, sendForgotPasswordEmail } = require("../utils/sendEmail");
const httpStatus = require("http-status");
const { strict } = require("assert");
const catchAsync = require("../utils/catchAsync");
const signupAdmin = catchAsync(async (req, res) => {
  const { Email, UserType } = req.body;
  /**
   * Creating Super Admin
   */
  if (UserType == 1) {
    const superAdmin = await userService.getUserByEmail(Email);

    if (superAdmin) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: `user already exists with this email: ${Email}`,
      });
    }

    req.body["Password"] = "superadmin@123";
    await authService.signupAdmin(req.body);

    return res.status(httpStatus.CREATED).json({
      message: "super admin created successfully!!",
    });
  }
  /**
   * Creating Admin
   */
  if (UserType == 2) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Token is required!!",
      });
    }
    try {
      console.log("inside try");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded");
      console.log(decoded);
      const superAdmin = await users
        .findOne({ _id: decoded.userId, UserType: 1 })
        .lean();

      if (!superAdmin) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "unauthorized");
      }

      const admin = await userService.getUserByEmail(Email);

      if (admin) {
        return res.status(httpStatus.BAD_REQUEST).json({
          message: `user already exists with this email ${Email}`,
        });
      }

      req.body["Password"] = "admin@123";

      let newAdmin = await authService.signupAdmin(req.body);
      newAdmin["parentId"] = decoded.userId;
      await newAdmin.save();

      return res.status(httpStatus.CREATED).json({
        message: "admin created successfully!!",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: error.message,
      });
    }
  }
});
// Function to generate a unique jti value
function generateJTI() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString().substring(2, 8);
  const jti = timestamp + random;
  return jti;
}
const signIn = catchAsync(async (req, res) => {
  const { Email, Password, type } = req.body;

  const user = await userService.getUserByEmail(Email);
  console.log(user)

  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "invalid email",
    });
  }
  if (!user.active) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "user is inactive please contact to admin!!",
    });
  }

  // Check if the user is already logged in to the same app type
  if (user.appTypes.includes(type)) {
    return res
      .status(401)
      .json({ message: "User is already logged in another device!!" });
  }

  const decPassord = await bcrypt.compare(Password, user.Password);
  if (!decPassord) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "password does not matched!",
    });
  }
  // Generate a unique jti value
  const jti = generateJTI();

  let tokenPayload = {
    userId: user._id,
    parentId: user.UserType == 3 ? user.parentId : null,
    appType: type == "web" ? "web" : "app",
    jti: jti,
    role: user.role,
    name: user.Name,
    UserType: user.UserType,
  };

  const token = tokenService.generateToken(tokenPayload);

  await new loginLogs({
    userId: user._id,
    type: 2,
    token: token,
  }).save();

  // Update the user's app types and jti array
  user.appTypes.push(type);
  if (type === "app") {
    user.appJtis.push(jti);
  } else if (type === "web") {
    user.webJtis.push(jti);
  }
  await user.save();

  // res.cookie(String("token"), token, {
  //   httpOnly: true,
  // });

  res.cookie(String("token"), token, {
    path: "/",
    maxAge: 900000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  //res.cookie('token', token, { maxAge: 3600000, httpOnly: true,sameSite:strict,secure:true });

  let userData = {};
  userData["Name"] = user.Name;
  userData["Email"] = user.Email;
  userData["role"] = user.role;
  userData["UserType"] = user && user.UserType;
  userData["pin"] = user.pin != null ? true : false;
  userData["menuPermissions"] = user.menuPermissions;

  return res.status(httpStatus.OK).json({
    message: "success",
    statusCode: httpStatus.OK,
    token: token,
    userData,
  });
});

const signout = catchAsync(async (req, res) => {
  console.log(req.user);
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
  if (token) {
    let { type } = req.body;
    // Find the user by ID
    if (req.user.UserType == 1) {
      req.user.userId = req.user._id;
    }
    const user = await userService.getUserById(req.user.userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Remove the app type from user's app types
    const index = user.appTypes.indexOf(type);
    if (index !== -1) {
      user.appTypes.splice(index, 1);
    }

    // Remove the corresponding jti from the appropriate array
    if (type === "app") {
      const jtiIndex = user.appJtis.indexOf(req.user.jti);
      if (jtiIndex !== -1) {
        user.appJtis;

        user.appJtis.splice(jtiIndex, 1);
      }
    } else if (type === "web") {
      const jtiIndex = user.webJtis.indexOf(req.user.jti);
      if (jtiIndex !== -1) {
        user.webJtis.splice(jtiIndex, 1);
      }
    }

    await user.save();
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

const createPin = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { pin, confirmPin } = req.body;

  const user = await users.findOneAndUpdate({ _id: _id }, { pin: pin });

  // Remove the app type from user's app types
  const index = user.appTypes.indexOf("app");
  if (index !== -1) {
    user.appTypes.splice(index, 1);
  }
  const jtiIndex = user.appJtis.indexOf(req.user.jti);
  if (jtiIndex !== -1) {
    user.appJtis;

    user.appJtis.splice(jtiIndex, 1);
  }

  // Generate a unique jti value
  const jti = generateJTI();

  user.appTypes.push("app");
  user.appJtis.push(jti);

  await user.save();
  let tokenPayload = {
    userId: user._id,
    appType: "app",
    jti: jti,
    role: user.role,
    name: user.Name,
  };

  const token = tokenService.generateToken(tokenPayload);
  res.cookie(String("token"), token, {
    path: "/",
    httpOnly: true,
    overwrite: true,
  });

  return res.status(200).json({
    statusCode: 200,
    message: "Pin Created SuccessFully",
    token: token,
    user: user,
    _id: _id,
  });
});
const loginWithPin = catchAsync(async (req, res) => {
  const { _id, pin } = req.body;

  //const user = await users.findOne({ _id: _id });

  let user = await userService.getUserById(_id);
  delete user["pin"];
  delete user.pin;

  if (pin != user.pin) {
    return res.status(400).json({
      message: "pin does not matched!!",
    });
  }
  if (pin == user.pin) {
    let tokenPayload = {
      userId: user._id,
      appType: "app",
      jti: user.appJtis[0],
      role: user.role,
      name: user.Name,
    };
    const token = tokenService.generateToken(tokenPayload);

    res.cookie(String("token"), token, {
      path: "/",
      httpOnly: true,
    });

    return res.status(200).json({
      statusCode: 200,
      message: "LogIn Successful",
      token,
      user,
    });
    res.cookie(String("token"), token.access.token, {
      path: "/",
      httpOnly: true,
      overwrite: true,
    });
    return res.status(200).json({
      statusCode: 200,
      message: "LogIn Successful",
      token: token.access.token,
    });
  }
});
const requestForgotPassword = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.body.Email);
  if (!user) {
    return res.status(400).json({
      message: "user does not exist!!",
    });
  }
  let token = await tokenService.getTokenByUserId(user._id);
  if (token) {
    await tokenService.deleteTokenByUserID(user._id);
  }
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(10));

  let tokenPayload = {
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  };
  await tokenService.createSetOrForgotPwdToken(tokenPayload);

  const forgotPasswordUrl = `http://localhost:8085/passwordReset?token=${resetToken}&id=${user._id}`;

  const message = `Hello ${user.Name},\n\n, There is an attempt to Reset your Password for your Profile for the Lead Management System.\nIf you did not try to do so,  make sure no one else has access to this email and relax.\nif you do want to reset the Password then Here is the link:\n\n ${forgotPasswordUrl}`;

  await sendForgotPasswordEmail({
    email: req.body.Email,
    subject: `Lead-Management Password Recovery`,
    message,
  });

  return res.status(200).json({
    message: `Email sent to ${user.Email} successfully`,
    link: forgotPasswordUrl,
  });
});
const ForgotPassword = catchAsync(async (req, res) => {
  const { token, userId, password } = req.body;

  const tokenDoc = await tokenService.getTokenByUserId(userId);

  if (!tokenDoc) {
    return res.status(400).json({
      message: "invalid or expired token",
    });
  }

  const isTokenValid = await bcrypt.compare(token, tokenDoc.token);

  if (!isTokenValid) {
    return res.status(400).json({
      message: "invalid or expired token",
    });
  }
  const newHashedPwd = await bcrypt.hash(password, Number(10));
  res.clearCookie("token");

  // Expire JWT tokens and remove jtis for both web and app
  await userService.updateUser(userId, {
    Password: newHashedPwd,
    webJtis: [],
    appJtis: [],
    appTypes: [],
  });
  await tokenService.deleteTokenByUserID(userId);

  return res.status(200).json({
    message: "password reseted successfully!!",
  });
});

module.exports = {
  signupAdmin,
  signIn,
  signout,
  createPin,
  loginWithPin,
  requestForgotPassword,
  ForgotPassword,
};
