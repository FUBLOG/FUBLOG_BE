const userRepository = require('../repository/statistics.repo');

const getStatistics = async (date) => {
  const months = [];
  const userCounts = [];
  const postCounts = [];

  for (let i = 4; i >= 0; i--) {
    const startDay = new Date(date.getFullYear(), date.getMonth() - i, 1);
    const endDay = new Date(date.getFullYear(), date.getMonth() - i + 1, 0);

    const userCount = await userRepository.getUserCountByMonth(startDay, endDay);
    const postCount = await userRepository.getPostCountByMonth(startDay, endDay);

    months.push(startDay.toLocaleString('default', { month: 'long', year: 'numeric' }));
    userCounts.push(userCount);
    postCounts.push(postCount);
  }

  return { months, userCounts, postCounts };
};

module.exports = { getStatistics };
