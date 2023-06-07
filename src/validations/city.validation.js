const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addCity = {
  body: Joi.object().keys({
    cityName: Joi.string().custom(objectId).required(),
  }),
};

const updateCity = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    cityName: Joi.string(),
  }),
};

const deleteCity = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = { addCity, updateCity, deleteCity };
