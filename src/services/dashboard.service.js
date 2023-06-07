const { leads } = require("../models");
const getLeadsDetail = async () => {
};
const getAnalyticsDetail = async () => {
  return await leads.aggregate([
    {
      $group: {
        _id: "$Course",
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);
  return await leads.aggregate([
    {
      $group: {
        _id: "$Course",
        leads: {
          $push: {},
        },
      },
    },
    {
      $project: {
        _id: 1,
        leads: {
          $size: "$leads",
        },
      },
    },
  ]);
};
const getCallDetails = async () => {
};
const getSourceDetails = async () => {
  return await leads.aggregate([
    {
      $group: {
        _id: "$Source",
        leads: {
          $push: {},
        },
      },
    },
    {
      $project: {
        _id: 1,
        leads: {
          $size: "$leads",
        },
      },
    },
    {
      $sort: {
        leads: -1,
      },
    },
  ]);
};

module.exports = {
  getLeadsDetail,
  getAnalyticsDetail,
  getCallDetails,
  getSourceDetails,
};
