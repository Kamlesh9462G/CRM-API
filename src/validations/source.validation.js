const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addSource = {
  body: Joi.object().keys({
    sourceName: Joi.string().custom(objectId).required(),
    description: Joi.string().custom(objectId).required(),
  }),
};

const updateSource = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    sourceName: Joi.string(),
    description: Joi.string(),
  }),
};

const deleteSource = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = { addSource, updateSource, deleteSource };
