const { dashboardService, leadService, userService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const getLeadsDetail = catchAsync(async (req, res) => {
  let leads = await dashboardService.getLeadsDetail();

  return res.status(200).json({
    message: "Leads",
    Data: leads,
  });
});
const getAnalyticsDetail = catchAsync(async (req, res) => {
  let analytics = await dashboardService.getAnalyticsDetail();
  return res.status(200).json({
    message: "Leads",
    Data: analytics,
  });
});
const getCallDetails = catchAsync(async (req, res) => {});
const getSourceDetails = catchAsync(async (req, res) => {
  let source = await dashboardService.getSourceDetails();
  return res.status(200).json({
    message: "Leads",
    Data: source,
  });
});
const getLeadsCount = catchAsync(async (req, res) => {
  // {
  //         AssignTo: {
  //           $in: ["Saurabh"],
  //         },
  //       },
  let filter = {};
  if (req.user.role == "user") {
    let arr = [];
    if (req.user.Permission.length == 0) {
      arr.push(req.user.Name);
      filter["AssignTo"] = {
        $in: arr,
      };
    }
    if (req.user.Permission.length > 0) {
      for (let permissionId of req.user.Permission) {
        let user = await userService.getUserById(permissionId);
        arr.push(user.Name);
      }
      filter["AssignTo"] = {
        $in: arr,
      };
    }
  }

  let leadsCount = await leadService.getLeadsCount(filter);

  let resp = {
    totalPrice: 0,
    openPrice: 0,
    enrolledPrice: 0,
    finalPrice: 0,
    hotPrice: 0,
    unsubscribePrice: 0,
    wrongPrice: 0,
  };
  const priceMap = {
    Open: "openPrice",
    "Final Lead": "finalPrice",
    "Hot Lead": "hotPrice",
    Enrolled: "enrolledPrice",
    "Wrong Lead": "wrongPrice",
    Unsubscribe: "unsubscribePrice",
  };

  leadsCount[0].Price.forEach((element) => {
    const key = priceMap[element._id];
    if (key) {
      resp[key] = element.Price ? element.Price : 0;
    }
  });
  resp["totalPrice"] =
    resp.openPrice + resp.enrolledPrice + resp.finalPrice + resp.hotPrice;
  delete leadsCount[0].Price;
  let respp = { ...leadsCount[0], ...resp };
  return res.status(200).json({
    message: "successs",
    Data: respp,
  });
});

module.exports = {
  getLeadsDetail,
  getAnalyticsDetail,
  getCallDetails,
  getSourceDetails,
  getLeadsCount,
};
