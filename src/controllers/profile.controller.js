const { profileService } = require("../services");
const getProfile = async (req, res) => {
  let { userId } = req.user;
  const profile = await profileService.getProfile(userId);
  return res.status(200).json({
    Data: profile,
  });
};

module.exports = {
  getProfile,
};
