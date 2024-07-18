const userRepository = require('../repository/statistics.repo');

const getSttt = async (date) => {
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

const getMonSttt = async () => {
  const endMonth = new Date();
  const startMonth = new Date(endMonth.getFullYear(), endMonth.getMonth() - 4, 1);

  const userStats = await userRepository.getMonUser(startMonth, endMonth);
  const postStats = await userRepository.getMonPost(startMonth, endMonth);

  const months = [];
  for (let i = 4; i >= 0; i--) {
    const date = new Date();
    date.setMonth(endMonth.getMonth() - i);
    months.push(`${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`);
  }

  const userCounts = Array(5).fill(0);
  const postCounts = Array(5).fill(0);

  userStats.forEach(stat => {
    const key = `${new Date(stat._id.year, stat._id.month - 1).toLocaleString('default', { month: 'long' })} ${stat._id.year}`;
    const index = months.indexOf(key);
    if (index !== -1) {
      userCounts[index] = stat.count;
    }
  });

  postStats.forEach(stat => {
    const key = `${new Date(stat._id.year, stat._id.month - 1).toLocaleString('default', { month: 'long' })} ${stat._id.year}`;
    const index = months.indexOf(key);
    if (index !== -1) {
      postCounts[index] = stat.count;
    }
  });

  return { months, userCounts, postCounts };
};

module.exports = {
  getSttt,
  getMonSttt
};
