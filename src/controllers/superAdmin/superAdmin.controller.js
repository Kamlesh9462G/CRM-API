const httpStatus = require("http-status");
const { userService } = require("../../services");
const getAllAdmins = async (req, res) => {
  const { _id } = req.query;
  let filter = {
    UserType: {
      $in: [2, 3],
    },
  };
  if (_id) {
    filter["_id"] = new ObjectId(_id);
  }
  const admins = await userService.getAllAdminsNew(filter);
  return res.status(httpStatus.OK).json({
    Data: admins,
  });
};

module.exports = {
  getAllAdmins,
};
