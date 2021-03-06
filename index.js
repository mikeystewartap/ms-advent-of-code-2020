/* eslint-disable no-console */
const Solutions = require('./solutions');

const main = async () => {
  const firstTuesdayResult = await Solutions.firstTuesday();
  console.log('1st Tuesday: ', firstTuesdayResult);

  const secondTuesdayResult = await Solutions.secondWednesday();
  console.log('2nd Wednesday: ', secondTuesdayResult);

  const thirdThursdayResult = await Solutions.thirdThursday();
  console.log('3rd Thursday: ', thirdThursdayResult);

  const fourthFridayResult = await Solutions.fourthFriday();
  console.log('4th Friday: ', fourthFridayResult);

  const fifthSaturdayResult = await Solutions.fifthSaturday();
  console.log('5th Saturday: ', fifthSaturdayResult);

  const sixthSundayResult = await Solutions.sixthSunday();
  console.log('6th Sunday: ', sixthSundayResult);

  const seventhMondayResult = await Solutions.seventhMonday();
  console.log('7th Monday: ', seventhMondayResult);

  const eighthTuesdayResult = await Solutions.eighthTuesday();
  console.log('8th Tuesday: ', eighthTuesdayResult);

  const ninthWednesdayResult = await Solutions.ninthWednesday();
  console.log('9th Wednesday: ', ninthWednesdayResult);

  const tenthThursdayResult = await Solutions.tenthThursday();
  console.log('10th Thursday: ', tenthThursdayResult);
};

main();
