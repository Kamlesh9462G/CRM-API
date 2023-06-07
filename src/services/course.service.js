const { course } = require("../models");
const addCourse = async (bodyData) => {
  return await course.create(bodyData);
};
const updateCourse = async (courseId, updateData) => {
  return await course.findOneAndUpdate(
    {
      _id: courseId,
    },
    updateData,
    { new: true }
  );
};
const deleteCourse = async (courseId) => {
  return await course.findOneAndDelete({
    _id: courseId,
  });
};
const getCourse = async (filter) => {
  return await course.find(filter);
};

module.exports = {
  addCourse,
  updateCourse,
  deleteCourse,
  getCourse,
};
