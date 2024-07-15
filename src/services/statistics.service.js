const userRepository = require('../repository/statistics.repo');

const getStatistics= async (date) => {
  const startDay = new Date(date.setHours(0, 0, 0, 0));
  const endDay = new Date(date.setHours(23, 59, 59, 999));

  const userCount = await userRepository.getTotalUser();
  const activeUserIds = await userRepository.getActUsers(startDay, endDay);
  const userAct = activeUserIds.length;
  const totalPosts = await userRepository.getTotalPost();
  const dailyPosts = await userRepository.getPostInDay(startDay, endDay);
  const newUsers = await userRepository.getUserInDay(startDay, endDay);

  return { userCount, userAct, totalPosts, dailyPosts, newUsers };
};

module.exports = {getStatistics};