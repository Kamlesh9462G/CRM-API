const { atService } = require("../services");

const getAtData = async (req,res) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
  getAtData,
};