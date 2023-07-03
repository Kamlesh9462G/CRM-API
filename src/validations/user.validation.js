const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addUser = {
  body: Joi.object().keys({
    Email: Joi.string().email().required(),
    Name: Joi.string().required(),
    City:Joi.string().required(),
    UserName: Joi.string().required(),
    UserType: Joi.number().required(),
    Phone: Joi.string().required(),
    Branch: Joi.string().required(),
    menuPermissions: Joi.array().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string(),
    username: Joi.string(),
    branch: Joi.string(),
    city: Joi.string(),
    userProfile: Joi.string(),
    permission: Joi.string(),
    currentStatus: Joi.string(),
    file: Joi.string(),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = { addUser, updateUser, deleteUser };
