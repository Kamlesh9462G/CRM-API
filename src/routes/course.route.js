const express = require("express");

const courseController = require("../controllers/course.controller");
const auth = require("../middlewares/auth");

const {cacheMiddleware} = require('../middlewares/cache')

const router = express.Router();

router
  .route("/")
  .get(auth,cacheMiddleware, courseController.getCourse)
  .post(auth,courseController.addCourse);

router
  .route("/:id")
  .get(auth, courseController.getCourseById)
  .put(auth, courseController.updateCourse)
  .delete(auth,courseController.deleteCourse);

module.exports = router;
