const express = require("express");

const cityController = require("../controllers/city.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(auth, cityController.getCity)
  .post(auth,cityController.addCity);

router
  .route("/:id")
  .get(auth, cityController.getCityById)
  .put(auth, cityController.updateCity)
  .delete(auth,cityController.deleteCity);

module.exports = router;
