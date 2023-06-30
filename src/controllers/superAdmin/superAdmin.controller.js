const httpStatus = require("http-status");
const { userService } = require("../../services");
const getAllAdmins = async (req, res) => {
  const admins = await userService.getAllAdminsNew();
  return res.status(httpStatus.OK).json({
    Data: admins,
  });
};

module.exports = {
  getAllAdmins,
};
