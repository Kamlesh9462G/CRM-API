const mongoose = require('mongoose');

let punchSchema = mongoose.Schema({

})

const DB = mongoose.connection.useDb("test");

const punches = DB.model("leads", punchSchema);

module.exports = punches;