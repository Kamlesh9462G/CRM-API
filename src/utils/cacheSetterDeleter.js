const setCache = async (redisClient, originalUrl, data) => {
  try {
    return await redisClient.set(originalUrl, data);
  } catch (error) {
    console.log(error);
  }
};

const deleteCache = async (redisClient,url) => {
    console.log(url)
  try {
    const deletedData =  await redisClient.del(url);
    console.log(deletedData)
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setCache,
  deleteCache,
};
