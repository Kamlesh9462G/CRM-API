const express = require("express");

const leadRoute = require("./lead.route");
const userRoute = require("./user.route");
const courseRoute = require("./course.route");
const sourceRoute = require("./source.route");
const branchRoute = require("./branch.route");
const cityRoute = require("./city.route");
const statusRoute = require("./status.route");
const authRoute = require('./auth.route')
const dashboardRoute = require('./dashboard.route')
const contactRoute = require('./contact.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/dashboard",
    route: dashboardRoute,
  },
  {
    path: "/lead",
    route: leadRoute,
  },
  {
    path: "/contact",
    route: contactRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/course",
    route: courseRoute,
  },
  {
    path: "/source",
    route: sourceRoute,
  },
  {
    path: "/branch",
    route: branchRoute,
  },
  {
    path: "/city",
    route: cityRoute,
  },
  {
    path: "/status",
    route: statusRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
