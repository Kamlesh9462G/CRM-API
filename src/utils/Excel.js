const { leadService } = require("../services");
const ExcelJS = require("exceljs");
const {sendEmail} = require('../utils/sendEmail')
const generateExcelSheet = async () => {
  const leads = await leadService.getAllLeads1();
  //const todayLeads = await leadService.getTodayLeads();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Today Leads");
  worksheet.columns = [
    { header: "UID", key: "UID", width: 10 },
    { header: "Name", key: "Name", width: 10 },
    { header: "City", key: "City", width: 10 },
    { header: "Address", key: "Address", width: 10 },
    { header: "CreatedBy", key: "CreatedBy", width: 10 },
    { header: "Phone1", key: "Phone1", width: 10 },
    { header: "Phone2", key: "Phone2", width: 10 },
    { header: "Email", key: "Email", width: 10 },
    { header: "AssignTo", key: "AssignTo", width: 10 },
    { header: "Source", key: "Source", width: 10 },
    { header: "Course", key: "Course", width: 10 },
    { header: "CoursePrice", key: "CoursePrice", width: 10 },
    { header: "Status", key: "Status", width: 10 },
    { header: "FollowupDate", key: "FollowupDate", width: 10 },
    { header: "Branch", key: "Branch", width: 10 },
    { header: "Remark", key: "Remark", width: 40 },
    { header: "prevFollowupDate", key: "prevFollowupDate", width: 10 },
    { header: "prevStatusDate", key: "prevStatusDate", width: 10 },
    { header: "prevStatus", key: "prevStatus", width: 10 },
    { header: "prevCourse", key: "prevCourse", width: 10 },
    { header: "prevPrice", key: "prevPrice", width: 10 },
    { header: "EnquiryDate", key: "EnquiryDate", width: 10 },
    { header: "LogType", key: "LogType", width: 10 },
    { header: "Remarks", key: "Remarks", width: 10 },
  ];
  for (let item of leads) {
    worksheet.addRow(item);
  }
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  await workbook.xlsx.writeFile("leadDate.xlsx");

  await sendEmail({
    email: "info.thexlacademy@gmail.com",
    subject: `Excel Sheet`,
  });

  await sendEmail({
    email: "Girindra.karn@thexlacademy.com",
    subject: `Excel Sheet`,
  });

  // await sendEmail({
  //   email: "kkgurjar03012000@gmail.com",
  //   subject: `Excel Sheet`,
  // });
};
module.exports = {
  generateExcelSheet,
};
