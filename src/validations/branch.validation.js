const Joi = require("joi");
const { objectId } = require("./custom.validation");
const addBranch = {
  body: Joi.object().keys({
    BranchName: Joi.string().custom(objectId).required(),
  }),
};
const updateBranch = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    BranchName: Joi.string(),
  }),
};
const deleteBranch = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = { addBranch, updateBranch, deleteBranch };
