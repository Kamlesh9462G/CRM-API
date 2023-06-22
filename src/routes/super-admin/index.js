const express = require("express");
const router = express.Router();

const superAdminRoutes = require("./superAdmin.route");

const defaultRoutes = [
  {
    path: "/admin",
    route: superAdminRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.route, route, path);
});

module.exports = router;
