const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const path = require('path')
const httpStatus = require("http-status");
const morgan = require("./config/morgan");

const ApiError = require("../src/utils/ApiError");
const { errorHandler, errorConverter } = require("../src/middlewares/error");

const adminRoutes = require("./routes/index");

const app = express();


app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// enable cors
app.use(cors());
app.options("*", cors());


// parse json request body
app.use(express.json());

app.use(cookieParser());




//admin routes
app.use("/v1/admin", adminRoutes);

app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "build", "index.html"));
});



// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
// handle error
app.use(errorHandler);

module.exports = app;
