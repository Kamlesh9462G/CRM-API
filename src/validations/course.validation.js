const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addCourse = {
  body: Joi.object().keys({
    courseName: Joi.string().custom(objectId).required(),
    coursePrice: Joi.number().custom(objectId).required(),
  }),
};

const updateCourse = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    courseName: Joi.string(),
    coursePrice: Joi.number(),
  }),
};

const deleteCourse = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = { addCourse, updateCourse, deleteCourse };
