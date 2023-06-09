const { punches } = require('../models')

const addPunchesData = async (puchData) => {
    for (let punch of puchData) {
        console.log(punch)
        const d = await punches.create(punch);
        console.log(d)
        //await punches.create(punch);
    }
    return;
}
module.exports = {
  addPunchesData,
};