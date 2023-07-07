const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require('compression')
require("dotenv").config();
const path = require('path')
const httpStatus = require("http-status");
const morgan = require("./config/morgan");

const ApiError = require("../src/utils/ApiError");
const { errorHandler, errorConverter } = require("../src/middlewares/error");

const adminRoutes = require("./routes/index");
const superAdminRoutes = require('./routes/super-admin/index')

const app = express();


app.use(compression())

app.use(morgan.successHandler);
app.use(morgan.errorHandler);


// enable cors
app.use(cors());
app.options("*", cors());


// parse json request body
app.use(express.json());

app.use(cookieParser());
app.get('/v1/admin', (req, res, next) => {
    // Show some content to the user
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    return res.status(200).json({message:"OK"})
})



//admin routes
app.use("/v1/admin", adminRoutes);
app.use("/v2/admin", adminRoutes);
app.use("/v1/super-admin", superAdminRoutes);

app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) => {
  // return res.status(200).json({
  //   message:"success!!"
  // })
  return res.sendFile(path.join(__dirname, "/build", "index.html"));
});



// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
// handle error
app.use(errorHandler);

module.exports = app;
