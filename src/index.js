const mongoose = require("mongoose");
const fs = require("fs");
var CronJob = require("cron").CronJob;
const app = require("./app");
const { generateExcelSheet } = require("../src/utils/Excel");
const path = require("path");
let PORT = 8085;
let server;

const tedious = require("tedious");
const axios = require("axios");
      

require("dotenv").config({ path: path.join(__dirname, "../.env") });

mongoose.set("strictQuery", true);
mongoose
  .connect(
    //"mongodb+srv://Kamal9462:Kamlesh9462@cluster0.llk00.mongodb.net/crm-new?authSource=admin&replicaSet=atlas-mcpzcn-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
    process.env.MONGO_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongoDB Connected");
    server = app.listen(PORT, () => {
      console.log(`server listening to port ${PORT}`);
                const job = new CronJob("30 5 * * *", function () {
        try {
          if (fs.existsSync("./leadDate.xlsx")) {
            fs.unlinkSync("./leadDate.xlsx");
          }
          generateExcelSheet();
        } catch (err) {
          console.error(err);
        }
      });
      job.start();

    });
  });


