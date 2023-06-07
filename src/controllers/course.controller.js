const mongoose = require("mongoose");
const courseModel = require("../models/course.model");
const httpStatus = require("http-status");
const { courseService } = require("../services");

const addCourse = async (req, res) => {
  const course = await courseService.addCourse(req.body);

  return res.status(httpStatus.CREATED).json({
    message: "course added succssfully!!",
    Data: course,
  });
};
const updateCourse = async (req, res) => {
  const course = await courseService.updateCourse(req.params.id, req.body);

  return res.status(httpStatus.OK).json({
    message: "course updated succssfully!!",
    Data: course,
  });
};
const deleteCourse = async (req, res) => {
  const course = await courseService.deleteCourse(req.params.id);

  return res.status(httpStatus.OK).json({
    message: "course deleted succssfully!!",
    Data: course,
  });
};
const getCourse = async (req, res) => {
  let filter = {};
  if (req.query._id) {
    filter["_id"] = req.query._id;
  }

  const course = await courseService.getCourse(filter);
  return res.status(httpStatus.OK).json({
    message: "courses",
    Data: course,
  });
};
const getCourseById = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getCourseById,
};
