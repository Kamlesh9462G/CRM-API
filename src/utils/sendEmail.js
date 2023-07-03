const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const sendEmail = async ({ email, subject }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(true),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: subject,
    attachments: [
      {
        filename: "leadDate.xlsx",
        path: "./leadDate.xlsx",
      },
    ],
  });
};
const sendForgotPasswordEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(true),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: subject,
    html: message,
  });
};
const sendGreetingEmailToUser = async (email, name, link) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(true),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./src/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/views"),
  };

  var mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject:
      "Welcome to Our Lead Management System! Password Update Required.!",
    template: "email",
    context: {
      name: name,
      link: link,
    },
  };

  transporter.use("compile", hbs(handlebarOptions));

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
  sendForgotPasswordEmail,
  sendGreetingEmailToUser,
};
