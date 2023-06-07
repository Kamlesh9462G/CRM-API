const Joi = require("joi");
const { objectId } = require("./custom.validation");
const addBranch = {
  body: Joi.object().keys({
    branchName: Joi.string().custom(objectId).required(),
  }),
};
const updateBranch = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    branchName: Joi.string(),
  }),
};

const deleteBranch = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = { addBranch, updateBranch, deleteBranch };
