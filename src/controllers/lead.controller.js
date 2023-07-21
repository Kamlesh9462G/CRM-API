const leads = require("../models/lead.model");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const { leadService, userService } = require("../services");
const CourseModel = require("../models/course.model");
const BranchModel = require("../models/branch.model");
const UsersModel = require("../models/user.model");
const indiamartleads = require("../models/indiamart.lead.model");
const pick = require("../utils/pick");
const { object } = require("joi");
const { addLeadToAlgolia } = require("../utils/Algolia");
const { ObjectId } = require("mongodb");
const axios = require("axios");
const { fi } = require("faker/lib/locales");
var CronJob = require("cron").CronJob;

const addLead = catchAsync(async (req, res) => {
  req.body["Remark"] = req.body.Remarks;

  delete req.body.Remarks;

  if (req.user.UserType == 2) {
    req.body["parentId"] = req.user.userId;
  }
  if (req.user.UserType == 3) {
    req.body["parentId"] = req.user.parentId;
    req.body["userId"] = req.user._id;
  }

  let addLead = await leadService.addLead(req.body);

  //await addLeadToAlgolia(addLead);

  return res.status(httpStatus.CREATED).json({
    message: "Lead created successfully!!",
    Data: addLead,
  });
});
const updateLead = catchAsync(async (req, res) => {
  req.body["name"] = req.user.name;
  const updatedLead = await leadService.updateLead(req.params.id, req.body);
  return res.status(httpStatus.OK).json({
    message: "Lead updated successfully!!",
    Data: updatedLead,
  });
});
const deleteLead = catchAsync(async (req, res) => {
  if (req.user.UserType === 3) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "permission denied",
    });
  }
  const deletedLead = await leadService.deleteLead(req.params.id);
  return res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: "Lead deleted successfully!!",
    Data: deletedLead,
  });
});
const getLeads = catchAsync(async (req, res) => {
  try {
    const options = pick(req.query, ["sortBy", "limit", "page"]);

    let { City, Source, Course, Status, Branch, AssignTo, keyword, ...rest } =
      req.query;

    const filter = { ...rest };
    // if (!Status) {
    //   return res.status(400).json({
    //     message: "status is required",
    //   });
    // }

    let dynamicObj = {
      $and: [],
    };
    if (req.user.UserType == 2) {
      filter["parentId"] = new ObjectId(req.user.userId);
      dynamicObj.$and.push({
        $or: [{ parentId: { $in: [new ObjectId(req.user.userId)] } }],
      });
    }
    if (req.user.UserType == 3) {
    }

    dynamicObj.$and.push({
      $or: [{ Status: { $in: ["Open", "Final Lead", "Hot Lead"] } }],
    });
    if (req.user.role === 3) {
      let arr = [];
      arr.push(req.user.Name);

      if (req.user.Permission.length == 0) {
        let selfLeads = await leads.findOne({ AssignTo: req.user.Name });
        if (selfLeads) {
          dynamicObj.$and.push({
            AssignTo: { $in: arr },
          });
        } else {
          return res.status(200).json({
            data: [],
          });
        }
      }
      if (req.user.Permission.length > 0) {
        for (let permissionId of req.user.Permission) {
          let user = await userService.getUserById(permissionId);
          if (user) {
            arr.push(user.Name);
          }
        }
        //arr.push(req.user.Permission);
        dynamicObj.$and.push({
          AssignTo: { $in: arr },
        });
      }
    } else {
      if (AssignTo) {
        dynamicObj.$and.push({
          AssignTo: { $in: AssignTo.split(",") },
        });
      }
    }

    if (Status) {
      dynamicObj.$and.push({
        $or: [{ Status: { $in: Status.split(",") } }],
      });
    }
    if (keyword) {
      // let arr = [];
      // if (req.user.role === "user") {
      //   if (req.user.Permission.length == 0) {
      //     keyword = "";
      //   }
      //   if (req.user.Permission.length > 0) {
      //     for (let permissionId of req.user.Permission) {
      //       let user = await userService.getUserById(permissionId);
      //       if (user) {
      //         arr.push(user.Name);
      //       }
      //     }
      //     dynamicObj.$and.push({
      //       AssignTo: { $in: arr },
      //     });
      //   }
      // }
      const searchKeywords = [
        "Name",
        "City",
        "Address",
        "CreatedBy",
        "Phone1",
        "Phone2",
        "Email",
        "AssignTo",
        "Source",
        "Course",
        "Status",
        "Branch",
        "Remark",
        "Remarks",
        "prevStatus",
        "prevCourse",
        "prevPrice",
        "whoChangesState",
        "LogType",
        "InformationDate",
      ];

      dynamicObj.$and = [
        {
          $or: searchKeywords.map((field) => ({
            [field]: { $regex: keyword, $options: "i" },
          })),
        },
      ];
    }

    if (City) {
      dynamicObj.$and.push({
        City: { $in: City.split(",") },
      });
    }
    // if (EnquiryCourse) {
    //         dynamicObj.$and.push({
    //           EnquiryCourse: { $in: City.split(",") },
    //         });
    // }
    if (Source) {
      dynamicObj.$and.push({
        Source: { $in: Source.split(",") },
      });
    }
    if (Course) {
      dynamicObj.$and.push({
        Course: { $in: Course.split(",") },
      });
    }
    if (Branch) {
      dynamicObj.$and.push({
        Branch: { $in: Branch.split(",") },
      });
    }
    if (filter.EnquiryDate) {
      const isoDateString1 = filter.EnquiryDate.gte;
      const isoDateString2 = filter.EnquiryDate.lte;

      const date1 = new Date(isoDateString1);
      const date2 = new Date(isoDateString2);

      dynamicObj.$and.push({
        EnquiryDate: {
          $gte: new Date(date1),
          $lt: new Date(date2),
        },
      });
    }
    if (filter.FollowupDate) {
      const isoDateString1 = filter.FollowupDate.gte;
      const isoDateString2 = filter.FollowupDate.lte;

      const date1 = new Date(isoDateString1);
      const date2 = new Date(isoDateString2);

      dynamicObj.$and.push({
        FollowupDate: {
          $gte: date1,
          $lt: date2,
        },
      });
    }

    delete filter.limit;
    delete filter.page;

    const leadss = await leadService.getLeads(dynamicObj, options);
    const { docs, ...otherFields } = leadss;
    return res.status(httpStatus.OK).json({
      message: "success!!",
      Data: docs,
      ...otherFields,
    });
  } catch (error) {}
});
const getLeadById = catchAsync(async (req, res) => {
  try {
    let obj = {};
    const lead = await leadService.getLeadById(req.params.id);
    obj = lead;
    delete obj.Branch;

    if (!lead) {
      return res.status(400).json({
        message: "lead not found",
      });
    }
    const {
      LogType,
      Remarks,
      whoChangesState,
      prevCourse,
      prevPrice,
      prevStatus,
      prevStatusDate,
      InformationDate,
      logAddedBy,
    } = lead;
    const leadLogss = [];
    const prevCourses = [];
    const prevStatusHistory = [];

    if (LogType.length > 0 && Remarks.length > 0) {
      for (let index = 0; index < LogType.length; index++) {
        const num1 = LogType[index];
        const num2 = Remarks[index];
        const num3 = logAddedBy[index];
        const num4 = InformationDate[index];
        leadLogss.push({
          LogType: num1,
          Remarks: num2,
          createdBy: num3,
          createdAt: num4,
        });
      }
    }

    if (prevCourse.length > 0 && prevPrice.length > 0) {
      for (let index = 0; index < prevCourse.length; index++) {
        const num3 = prevCourse[index];
        const num4 = prevPrice[index];
        prevCourses.push({
          prevCourse: num3,
          prevPrice: num4,
        });
      }
    }

    if (prevStatus.length > 0 && prevStatusDate.length > 0) {
      for (let index = 0; index < prevStatus.length; index++) {
        const num1 = prevStatus[index];
        const num2 = prevStatusDate[index];
        const num3 = whoChangesState[index];
        //const num3 = whoChangesState[index];
        prevStatusHistory.push({
          status: num1,
          createdAt: num2,
          createdBy: num3,
        });
      }
    }

    return res.status(200).json({
      message: "success",
      Data: lead,
      leadLogss,
      prevCourses,
      prevStatusHistory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const getNewLeads = catchAsync(async (req, res) => {
  const {
    keyword,
    City,
    Course,
    Status,
    Branch,
    AssignTo,
    Source,
    EnquiryDate,
    FollowupDate,
  } = req.query;
  let filter = {};
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  if (req.user.UserType == 2) {
    Object.assign(filter, {
      parentId: new ObjectId(req.user.userId),
    });
  }
  if (req.user.UserType == 3) {
    let userIds = [];
    userIds.push(new ObjectId(req.user._id));
    if (req.user.Permission.length > 0) {
      for (let userId of req.user.Permission) {
        userIds.push(new ObjectId(userId));
      }
    }
    Object.assign(filter, {
      parentId: new ObjectId(req.user.parentId),
      userId: { $in: userIds },
    });
  }
  if (City) {
    Object.assign(filter, {
      City: { $in: City.split(",") },
    });
  }
  if (Course) {
    Object.assign(filter, {
      Course: { $in: Course.split(",") },
    });
  }
  if (Status) {
    Object.assign(filter, {
      Status: { $in: Status.split(",") },
    });
  }
  if (Branch) {
    Object.assign(filter, {
      Branch: { $in: Branch.split(",") },
    });
  }
  if (Source) {
    Object.assign(filter, {
      Source: { $in: Source.split(",") },
    });
  }
  if (AssignTo) {
    Object.assign(filter, {
      AssignTo: { $in: AssignTo.split(",") },
    });
  }
  if (EnquiryDate) {
    const isoDateString1 = EnquiryDate.gte;
    const isoDateString2 = EnquiryDate.lte;

    const date1 = new Date(isoDateString1);
    const date2 = new Date(isoDateString2);
    Object.assign(filter, {
      EnquiryDate: {
        $gte: new Date(date1),
        $lt: new Date(date2),
      },
    });
  }
  if (FollowupDate) {
    const isoDateString1 = FollowupDate.gte;
    const isoDateString2 = FollowupDate.lte;

    const date1 = new Date(isoDateString1);
    const date2 = new Date(isoDateString2);
    Object.assign(filter, {
      FollowupDate: {
        $gte: new Date(date1),
        $lt: new Date(date2),
      },
    });
  }

  const leadss = await leadService.getNewLeads(filter, options);
  const { docs, ...otherFields } = leadss;
  return res.status(httpStatus.OK).json({
    message: "success!!",
    Data: docs,
    ...otherFields,
  });
});
// const getLeads = catchAsync(async (req, res) => {
//   let filter = {};
//   if (req.query._id) {
//     filter["_id"] = req.query._id;
//   }

//   const leads = await leadService.getLeads(filter);
//   return res.status(httpStatus.OK).json({
//     message: "success!!",
//     Data: leads,
//   });
// });
const getCourse_Branch_UserData = catchAsync(async (req, res) => {
  try {
    const [course, branch, users] = await Promise.all([
      CourseModel.find({})
        .lean()
        .exec()
        .catch((err) => {
          throw err;
        }),
      BranchModel.find({})
        .lean()
        .exec()
        .catch((err) => {
          throw err;
        }),
      UsersModel.find({})
        .lean()
        .exec()
        .catch((err) => {
          throw err;
        }),
    ]);
    const data = { course, branch, users };
    return res.status(httpStatus.CREATED).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const addLeadLogs = catchAsync(async (req, res) => {
  const { leadId } = req.body;
  const lead = await leadService.getLeadById(leadId);
  if (!lead) {
    return res.status(400).json({
      message: "lead not found!",
    });
  }
  req.body["name"] = req.user.name;
  await leadService.addLeadLogs(leadId, req.body);
  return res.status(httpStatus.CREATED).json({
    message: "success",
  });
});

const getDuplicateLeads = catchAsync(async (req, res) => {
  const { Email, Phone1, Phone2 } = req.body;
  let filter = {
    $or: [],
  };
  if (Email) {
    filter.$or.push({
      Email: Email,
    });
  }
  if (Phone1) {
    filter.$or.push({
      Phone1: Phone1,
    });
  }
  if (Phone2) {
    filter.$or.push({
      Phone2: Phone2,
    });
  }
  const lead = await leadService.getDuplicateLeads(filter);

  if (lead.length > 0) {
    return res.status(403).json({
      message: "lead already exists!!",
      lead: lead,
    });
  } else {
    return res.status(200).json({
      lead: [],
    });
  }
});

const TodaysFollowupLeads = catchAsync(async (req, res) => {
  if (req.user.role == "admin") {
    return res.status(200).json({
      message: [],
    });
  }
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  var start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  var end = new Date();
  end.setUTCHours(23, 59, 59, 999);

  let filter = {
    $and: [],
  };

  filter["FollowupDate"] = {
    $gte: start,
    $lte: end,
  };

  let arr = [];
  if (req.user.Permission.length == 0) {
    let selfLeads = await leads.findOne({ AssignTo: req.user.Name });
    if (selfLeads) {
      arr.push(req.user.Name);
      filter.$and.push({
        AssignTo: { $in: arr },
      });
    } else {
      return res.status(200).json({
        data: [],
      });
    }
  }
  if (req.user.Permission.length > 0) {
    for (let permissionId of req.user.Permission) {
      let user = await userService.getUserById(permissionId);
      if (user) {
        arr.push(user.Name);
      }
    }
    filter.$and.push({
      AssignTo: { $in: arr },
    });
  }

  const leadss = await leadService.TodaysFollowupLeads(filter, options);

  const { docs, ...otherFields } = leadss;
  return res.status(httpStatus.OK).json({
    message: "success!!",
    Data: docs,
    ...otherFields,
  });
});

const getLeadLogs = catchAsync(async (req, res) => {
  const { leadId } = req.body;

  const lead = await leadService.getLeadById(leadId);
  if (!lead) {
    return res.status(400).json({
      message: "lead not found!",
    });
  }

  const leadLogs = await leadService.getLeadLogs(leadId);
  const { LogType, Remarks } = leadLogs;

  let leadLogss = [];

  LogType.forEach((num1, index) => {
    const num2 = Remarks[index];
    leadLogss.push({
      LogType: num1,
      Remarks: num2,
    });
  });

  leadLogs[0]["leadLogss"] = leadLogss;
  return res.status(200).json({
    message: "success",
    Data: leadLogs,
  });
});
const searchDuplicateLeads = catchAsync(async (req, res) => {
  let { keyword } = req.query;

  if (!keyword) {
    return res.status(httpStatus.OK).json({
      message: "success",
      Data: [],
    });
  }

  const matchQuery = {
    $or: [
      {
        Email: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        Phone1: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        Phone2: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  };

  const searchedLeads = await leadService.searchDuplicateLeads(matchQuery);
  return res.status(httpStatus.OK).json({
    message: "success",
    Data: searchedLeads,
  });
});
const formatedDate = async () => {
  let amTime = "09:00:00";
  let pmTime = "13:00:00";
  let firstDay = new Date();

  let sixthDay = new Date();
  sixthDay.setDate(firstDay.getDate() + 4);

  // Add leading zeroes to day and month components
  let formattedStartTime =
    (firstDay.getDate() < 10 ? "0" : "") +
    firstDay.getDate() +
    "-" +
    (firstDay.getMonth() + 1 < 10 ? "0" : "") +
    (firstDay.getMonth() + 1) +
    "-" +
    firstDay.getFullYear() +
    " " +
    amTime;

  // Add leading zeroes to day and month components
  let formattedEndTime =
    (sixthDay.getDate() < 10 ? "0" : "") +
    sixthDay.getDate() +
    "-" +
    (sixthDay.getMonth() + 1 < 10 ? "0" : "") +
    (sixthDay.getMonth() + 1) +
    "-" +
    sixthDay.getFullYear() +
    " " +
    pmTime;
  return {
    startTime: formattedStartTime,
    endTime: formattedEndTime,
  };
};
const recieveIndiaMartLeads = async () => {
  const getFormatedDate = await formatedDate();
  const url = `https://mapi.indiamart.com/wservce/crm/crmListing/v2/?glusr_crm_key=${process.env.GLUSR_CRM_KEY}=&start_time=${getFormatedDate.startTime}&end_time=${getFormatedDate.endTime}`;
  const response = await axios.get(url);
  const leads = response.data.RESPONSE;
  leads.forEach(async (lead) => {
    const existingLead = await indiamartleads.findOne({
      UNIQUE_QUERY_ID: lead.UNIQUE_QUERY_ID,
    });
    if (!existingLead) {
      lead["PARENT_ID"] = new ObjectId("64b10903548e3eefb2874999");
      let addLead = await indiamartleads.create(lead);
    }
  });
};
const job = new CronJob("*/1 * * * *", async function () {
  console.log("cron running every 10 minute");
  try {
    recieveIndiaMartLeads();
  } catch (err) {
    console.error(err);
  }
});
job.start();

const assignLeadToUser = catchAsync(async (req, res) => {
  const { leadId, userId } = req.body;
  const lead = await indiamartleads.findOne({ _id: leadId, ASSIGNED: false });
  if (lead) {
    const user = await userService.getUserById(userId);
    let leadData = {
      Remark: QUERY_MESSAGE,
      parentId: PARENT_ID,
      userId: userId,
      Name: SENDER_NAME,
      EnquiryDate: QUERY_TIME,
      Phone1: SENDER_MOBILE,
      Phone2: SENDER_MOBILE_ALT,
      Email: SENDER_EMAIL,
      City: SENDER_CITY,
      Address: SENDER_ADDRESS,
      AssignTo: user.Name,
    };
    await leadService.addLead(leadData);
  }
  lead["ASSIGNED"] = true;
  await lead.save();

  return res.status(200).json({
    message: "lead assigned successfully!!",
  });
});

module.exports = {
  addLead,
  updateLead,
  deleteLead,
  getLeadById,
  getCourse_Branch_UserData,
  addLeadLogs,
  getLeads,
  getDuplicateLeads,
  TodaysFollowupLeads,
  getLeadLogs,
  searchDuplicateLeads,
  getNewLeads,
  recieveIndiaMartLeads,
  assignLeadToUser,
};
