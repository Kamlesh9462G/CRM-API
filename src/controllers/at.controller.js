const { atService } = require("../services");

const getAtData = async (req,res) => {
    try {
        console.log(req.body)
        return res.status(201).json({
            message:"got your punch data"
        })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
  getAtData,
};