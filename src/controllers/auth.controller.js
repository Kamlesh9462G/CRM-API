const { authService, userService, tokenService } = require("../services");
const { loginLogs, users } = require("../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { sendEmail, sendForgotPasswordEmail } = require("../utils/sendEmail");

const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const signupAdmin = async (req, res) => {
  req.body["role"] = "admin";
  const admin = await authService.signupAdmin(req.body);
  let tokenPayload = {
    userId: admin._id,
    role: "admin",
  };
  const token =  tokenService.generateToken(tokenPayload);
  return res.status(httpStatus.CREATED).json({
    message: "success!!",
    token: token,
  });
};
// Function to generate a unique jti value
function generateJTI() {
  // Generate a unique string or use a library to generate a random UUID
  // Here's an example using a timestamp and a random number
  const timestamp = Date.now().toString();
  const random = Math.random().toString().substring(2, 8);
  const jti = timestamp + random;
  return jti;
}
const signIn = async (req, res) => {
  const { Email, Password, type } = req.body;

  const user = await userService.getUserByEmail(Email);

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
    appType: type == "web" ? "web" : "app",
    jti: jti,
    role: user.role,
  };

  const token = await tokenService.generateToken(tokenPayload);

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

  let userData = {};
  userData["Name"] = user.Name;
  userData["Email"] = user.Email;
  userData["role"] = user.role;
  userData["pin"] = user.pin != null ? true : false;

  return res.status(httpStatus.OK).json({
    message: "success",
    statusCode: httpStatus.OK,
    token: token,
    userData,
  });
};

const signout = async (req, res) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
  if (token) {
    let { type } = req.body;
    // Find the user by ID
    const user = await userService.getUserById(req.user.userId);
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
};

const createPin = async (req, res) => {
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
};
const loginWithPin = async (req, res) => {
  const { _id, pin } = req.body;

  //const user = await users.findOne({ _id: _id });

  let user = await userService.getUserById(_id);
  delete user["pin"];
  delete user.pin;

  if (pin != user.pin) {
    return res.status(400).json({
      message:"pin does not matched!!"
    })
  }
  if (pin == user.pin) {

    let tokenPayload = {
      userId: user._id,
      appType: "app",
      jti: user.appJtis[0],
      role: user.role,
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
};
const requestForgotPassword = async (req, res) => {
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
};
const ForgotPassword = async (req, res) => {
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
};

module.exports = {
  signupAdmin,
  signIn,
  signout,
  createPin,
  loginWithPin,
  requestForgotPassword,
  ForgotPassword,
};
