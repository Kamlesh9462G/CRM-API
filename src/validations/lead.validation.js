const Joi = require("joi");
const { objectId } = require("./custom.validation");

const object = Joi.object({
  a: Joi.number().min(1).max(10).integer(),
  b: 'some string'
});
const addLead = {
  body: Joi.object().keys({
    data:object
  }),
};

const updateLead = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    owner: Joi.string(),
    name: Joi.string(),
    enquiryDate: Joi.date(),
    enquiryCourse: Joi.string(),
    mobileNumber: Joi.string(),
    mobileNumber2: Joi.string(),
    email: Joi.string(),
    followUp: Joi.date(),
    status: Joi.string(),
    branch: Joi.string(),
    city: Joi.string(),
    source: Joi.string(),
    assignedTo: Joi.string(),
    location: Joi.string(),
    image: Joi.string(),
    remarks: Joi.string(),
    lfd: Joi.string(),
    days: Joi.string(),
  }),
};

const deleteLead = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = { addLead, updateLead, deleteLead };
