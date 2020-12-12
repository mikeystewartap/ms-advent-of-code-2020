/* eslint-disable max-len */
const fs = require('fs');

const getPositiveAnswers = (passengersAnswers) => {
  const positiveAnswers = [];
  passengersAnswers.forEach((passengerAnswer) => {
    for (let i = 0; i < passengerAnswer.length; i += 1) {
      const answer = passengerAnswer[i];
      if (!positiveAnswers.includes(answer)) {
        positiveAnswers.push(answer);
      }
    }
  });
  return positiveAnswers.sort();
};

const getAllPositiveAnswers = (passengersAnswers) => {
  const groupAnswers = [];
  const allPositiveAnswers = [];
  passengersAnswers.forEach((passengerAnswer) => {
    for (let i = 0; i < passengerAnswer.length; i += 1) {
      const answer = passengerAnswer[i].trim();
      if (answer !== '') {
        groupAnswers.push(answer);
      }
    }
  });

  groupAnswers.forEach((answer) => {
    const answerInstances = groupAnswers.filter((groupAnswer) => answer === groupAnswer).length;

    if (answerInstances === passengersAnswers.length && !allPositiveAnswers.includes(answer)) {
      allPositiveAnswers.push(answer);
    }
  });

  return allPositiveAnswers.sort();
};

module.exports = async () => {
  const inputString = await fs.readFileSync('./input/6th-sunday.txt', 'utf8');
  const groups = inputString.split('\n\n').map((groupString) => {
    const passengersAnswers = groupString.split('\n');
    return {
      passengersAnswers,
      positiveAnswers: getPositiveAnswers(passengersAnswers),
      allPositiveAnswers: getAllPositiveAnswers(passengersAnswers),
    };
  });

  // The number of positive answers across a group
  let partOne = 0;

  // the number of positives answers that all members of the group answered yes to
  let partTwo = 0;
  for (let i = 0; i < groups.length; i += 1) {
    partOne += groups[i].positiveAnswers.length;
    partTwo += groups[i].allPositiveAnswers.length;
  }

  return {
    partOne,
    partTwo,
  };
};
