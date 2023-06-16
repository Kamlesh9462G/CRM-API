const mongoose = require("mongoose");
const https = require('https');
const http = require('http');

const fs = require('fs');
var CronJob = require("cron").CronJob;
const app = require("./app");
const { generateExcelSheet } = require("../src/utils/Excel");
const path = require("path");
let server;

require("dotenv").config({ path: path.join(__dirname, "../.env") });

let PORT = process.env.PORT;
let HTTPS = process.env.HTTPS;
console.log(PORT,HTTPS)


mongoose.set("strictQuery", true);
mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongoDB Connected");
    if (HTTPS == 'false') {
      const httpServer = http.createServer(app);
      server = httpServer.listen(PORT, () => {
        console.log(`HTTP Server running on port ${PORT}`);
      });
    } else {
      const httpsServer = https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/crm-live.thetoppersacademy.org/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/crm-live.thetoppersacademy.org/fullchain.pem'),
      }, app);

      server = httpsServer.listen(PORT, () => {
        console.log(`HTTPS Server running on port  ${PORT}`);
      });
    }
      //   const job = new CronJob("30 5 * * *", function () {
      //   try {
      //     if (fs.existsSync("./leadDate.xlsx")) {
      //       fs.unlinkSync("./leadDate.xlsx");
      //     }
      //     generateExcelSheet();
      //   } catch (err) {
      //     console.error(err);
      //   }
      // });
      // job.start();

  
  });


  // const getLoginDetails = async () => {
  //   try {
  //     sql.query(
  //       config,
  //       "select * from Tran_MachineRawPunch",
  //       async (err, rows) => {
  //         console.log(rows);
  //         const res = await axios.post(
  //           "http://3.110.163.161/v1/admin/at/at-data",
  //           rows
  //         );
  //         // const res=await axios.get('https://jsonplaceholder.typicode.com/todos');
  //         // const data=await res.data
  //         //    console.log(data)
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error.message, "error");
  //   }
  // };
  // cron.schedule("*/5 * * * * *", function () {
  //   console.log("running a task every 10 second");
  //   getLoginDetails();
  // });


