const getLeadData = async (req,res) => {
    console.log("getting data from facebook leads");

    return res.status(200).json({
        message:"Success"
    })
}

module.exports = {
  getLeadData,
};