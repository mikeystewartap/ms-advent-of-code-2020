/* eslint-disable no-console */
const FirstTuesday = require('./solutions/1st-tuesday');

const main = async () => {
  const firstTuesdayResult = await FirstTuesday();
  console.log('1st Tuesday: ', firstTuesdayResult);
};

main();
