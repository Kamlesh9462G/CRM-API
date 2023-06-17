const leads = require("../models/lead.model");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const { leadService, userService } = require("../services");
const CourseModel = require("../models/course.model");
const BranchModel = require("../models/branch.model");
const UsersModel = require("../models/user.model");
const pick = require("../utils/pick");
const { object } = require("joi");
const { addLeadToAlgolia } = require("../utils/Algolia");
const { objectId } = require("../validations/custom.validation");
const addLead = catchAsync(async (req, res) => {
  req.body["Remark"] = req.body.Remarks;

  delete req.body.Remarks;

  let addLead = await leadService.addLead(req.body);

  //await addLeadToAlgolia(addLead);

  return res.status(httpStatus.CREATED).json({
    message: "Lead created successfully!!",
    Data: addLead,
  });
});
const updateLead = catchAsync(async (req, res) => {
  req.body["name"] = req.user.name;
  console.log(req.user);
  const updatedLead = await leadService.updateLead(req.params.id, req.body);
  return res.status(httpStatus.OK).json({
    message: "Lead updated successfully!!",
    Data: updatedLead,
  });
});
const deleteLead = catchAsync(async (req, res) => {
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
    dynamicObj.$and.push({
      $or: [{ Status: { $in: ["Open", "Final Lead", "Hot Lead"] } }],
    });
    if (req.user.role === "user") {
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

const getLeadById = async (req, res) => {
  try {
    let obj = {};
    const lead = await leadService.getLeadById(req.params.id);
    obj = lead;
    delete obj.Branch;
    console.log(obj);

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
};


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

const getCourse_Branch_UserData = async (req, res) => {
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
};

const addLeadLogs = async (req, res) => {
  const { leadId } = req.body;
  console.log(leadId);
  const lead = await leadService.getLeadById(leadId);
  if (!lead) {
    return res.status(400).json({
      message: "lead not found!",
    });
  }
  //console.log(req.user)
  req.body["name"] = req.user.name;
  await leadService.addLeadLogs(leadId, req.body);
  return res.status(httpStatus.CREATED).json({
    message: "success",
  });
};

const getDuplicateLeads = async (req, res) => {
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
};

const TodaysFollowupLeads = async (req, res) => {
  console.log("came herer");

  console.log(req.user.role);
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
};

const getLeadLogs = async (req, res) => {
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
};
const searchDuplicateLeads = async (req, res) => {
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
};

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
};
