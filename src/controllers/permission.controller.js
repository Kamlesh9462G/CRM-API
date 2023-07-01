const { permissionService } = require("../services");
const addPermission = async (req, res) => {
  const addPermission = await permissionService.addPermission(req.body);
  return res.status(201).json({
    message: "permission created successfully!!",
  });
};
const getPermission = async (req, res) => {
  console.log("inside get permission controller")
  const permissions = await permissionService.getPermission();
  return res.status(200).json({
    Data: permissions,
  });
};
module.exports = {
  addPermission,
  getPermission,
};
