/* eslint-disable no-console */
const FirstTuesday = require('./solutions/1st-tuesday');
const SecondWednesday = require('./solutions/2nd-wednesday');

const main = async () => {
  const firstTuesdayResult = await FirstTuesday();
  console.log('1st Tuesday: ', firstTuesdayResult);

  const secondTuesdayResult = await SecondWednesday();
  console.log('2nd Wednesday: ', secondTuesdayResult);
};

main();
