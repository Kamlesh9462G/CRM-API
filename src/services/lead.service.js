const { leads, leadLogs, leadsInfo } = require("../models");
const { ObjectId } = require("mongodb");
const addLead = async (bodyData) => {
  return await leads.create(bodyData);
};

const updateLead = async (leadId, updateData) => {
  let lead = await getLeadById(leadId);

  if (updateData.EnquiryCourse && updateData.CoursePrice) {
    lead.prevCourse.push(lead.EnquiryCourse);
    lead.prevPrice.push(lead.CoursePrice);
    await lead.save();
  }
  if (updateData.FollowupDate) {
    lead.PrevFollowupDate.push(updateData.FollowupDate);
    await lead.save();
  }
  if (updateData.Status) {
    let dd = new Date();
    lead.prevStatus.push(updateData.Status);
    lead.prevStatusDate.push(dd);
    lead.whoChangesState.push(updateData.name), await lead.save();
  }
  return await leads.findOneAndUpdate(
    {
      _id: leadId,
    },
    updateData,
    { new: true }
  );
};

const deleteLead = async (leadId) => {
  return await leads.findOneAndDelete({
    _id: leadId,
  });
};

const getLeads = async (filter, options) => {
  //calculate current date and subtract -1 fro getting yesterday date
  let curDate = new Date();
  curDate.setDate(curDate.getDate() - 1);
  var aggregate = leads.aggregate([
    {
      $match: filter,
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $addFields: {
        daysss: {
          $floor: {
            $divide: [
              {
                $subtract: ["$FollowupDate", curDate],
              },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
    },

    {
      $project: {
        UID: 1,
        AssignTo: 1,
        Source: 1,
        City: 1,
        Status: 1,
        EnquiryDate: 1,
        Name: 1,
        Phone1: 1,
        Phone2: 1,
        Course: "$EnquiryCourse",
        CoursePrice: 1,
        Days2: 1,
        daysss: 1,
        FollowupDate: 1,
      },
    },
  ]);

  return await leads.aggregatePaginate(aggregate, options);
};
const getLeadById = async (leadId) => {
  return await leads.findOne({ _id: leadId });
};

const addLeadLogs = async (leadId, leadLogData) => {
  const { LogType, Remarks, name } = leadLogData;
  const d = new Date();
  return await leads.findOneAndUpdate(
    { _id: leadId },
    {
      $push: {
        LogType: LogType,
        Remarks: Remarks,
        InformationDate: d,
        logAddedBy: name,
      },
    }
  );
  return await leadLogs.create(leadLogData);
};

const getLeadsByEmailOrPhone = async (Email, Phone1, Phone2) => {
  return await leads.aggregate([
    {
      $match: {
        $or: [
          {
            Email: Email,
          },
          {
            Phone1: Phone1,
          },
          {
            Phone2: Phone2,
          },
        ],
      },
    },
  ]);
};
const getDuplicateLeads = async (filter) => {
  return await leads.aggregate([
    {
      $match: filter,
    },
  ]);
};

const TodaysFollowupLeads = async (filter, options) => {
  const agg = leads.aggregate([
    {
      $match: filter,
    },
  ]);

  return await leads.aggregatePaginate(agg, options);
};

const getLeadsCount = async (filter) => {
  return await leads.aggregate([
    {
      $match: filter,
    },
    {
      $facet: {
        totalLeads: [
          {
            $match: {},
          },
        ],
        openLeads: [
          {
            $match: {
              Status: "Open",
            },
          },
        ],
        hotLeads: [
          {
            $match: {
              Status: "Hot Lead",
            },
          },
        ],
        finalLeads: [
          {
            $match: {
              Status: "Final Lead",
            },
          },
        ],
        wrongLeads: [
          {
            $match: {
              Status: "Wrong Lead",
            },
          },
        ],
        enrolledLeads: [
          {
            $match: {
              Status: "Enrolled",
            },
          },
        ],
        unSubscribedLeads: [
          {
            $match: {
              Status: "Unsubscribe",
            },
          },
        ],
        Price: [
          {
            $group: {
              _id: "$Status",
              Price: {
                $sum: "$CoursePrice",
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        totalLeads: {
          $size: "$totalLeads",
        },
        openLeads: {
          $size: "$openLeads",
        },
        hotLeads: {
          $size: "$hotLeads",
        },
        finalLeads: {
          $size: "$finalLeads",
        },
        wrongLeads: {
          $size: "$wrongLeads",
        },
        enrolledLeads: {
          $size: "$enrolledLeads",
        },
        unSubscribedLeads: {
          $size: "$enrolledLeads",
        },
        Price: 1,
      },
    },
  ]);
};

const getLeadLogs = async (leadId) => {
  return await leads.aggregate([
    {
      $match: {
        _id: new ObjectId(leadId),
      },
    },
    {
      $project: {
        _id: 1,
        Name: 1,
        Phone1: 1,
        Phone2: 1,
        Email: 1,
        City: 1,
        Course: 1,
        CoursePrice: 1,
        AssignTo: 1,
        Status: 1,
        Remark: 1,
        EnquiryDate: 1,
        FollowupDate: 1,
        Source: 1,
        LogType: 1,
        Remarks: 1,
      },
    },
  ]);
};
const getAllLeads = async () => {
  return await leads.find();
};

const getAllLeads1 = async () => {
  const leads = await leadsInfo.aggregate([
    {
      $match: {},
    },
  ]);

  return leads;
};
const getTodayLeadss = async () => {
  var start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  var end = new Date();
  end.setUTCHours(23, 59, 59, 999);

  let filter = {};

  filter["EnquiryDate"] = {
    $gte: start,
    $lte: end,
  };
  return await leadsInfo.aggregate([
    {
      $match: filter,
    },
  ]);
  return leadsInfo.find({
    EnquiryDate: ISODate("2023-07-12T00:00:00.000+00:00"),
  });
};
const getTodayLeads = async () => {
  return leads.aggregate([
    {
      $match: {
        EnquiryDate: {
          $gte: new Date("Mon, 15 May 2023 00:00:00 GMT"),
          $lte: new Date("Fri, 26 May 2023 23:59:59 GMT"),
        },
      },
    },
    {
      $sort: {
        EnquiryDate: 1,
      },
    },
  ]);
};
const searchDuplicateLeads = async (filter) => {
  return await leads.aggregate([
    {
      $match: filter,
    },
  ]);
};
const getNewLeads = async (filter, options) => {
  //calculate current date and subtract -1 fro getting yesterday date
  let curDate = new Date();
  curDate.setDate(curDate.getDate() - 1);
  var aggregate = leads.aggregate([
    {
      $match: filter,
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $addFields: {
        daysss: {
          $floor: {
            $divide: [
              {
                $subtract: ["$FollowupDate", curDate],
              },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
    },

    {
      $project: {
        UID: 1,
        AssignTo: 1,
        Source: 1,
        City: 1,
        Status: 1,
        EnquiryDate: 1,
        Name: 1,
        Phone1: 1,
        Phone2: 1,
        Course: "$EnquiryCourse",
        CoursePrice: 1,
        Days2: 1,
        daysss: 1,
        FollowupDate: 1,
      },
    },
  ]);

  return await leads.aggregatePaginate(aggregate, options);
};

module.exports = {
  addLead,
  updateLead,
  deleteLead,
  getLeads,
  addLeadLogs,
  getLeadsByEmailOrPhone,
  getDuplicateLeads,
  TodaysFollowupLeads,
  getLeadsCount,
  getLeadById,
  getLeadLogs,
  getAllLeads,
  getTodayLeads,
  getAllLeads1,
  searchDuplicateLeads,
  getNewLeads,
  getTodayLeadss,
};
