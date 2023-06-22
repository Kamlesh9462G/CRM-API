const {userService} = require('../../services')
const getAllAdmins = async (req, res) => {

  console.log("get all admins!!!");

  const admins = await userService.addUser();
};

module.exports = {
  getAllAdmins,
};
