/* eslint-disable no-console */
/* eslint-disable max-len */
const fs = require('fs');

const getHighestRatedAdapter = (joltageAdapters) => {
  joltageAdapters.sort((a, b) => a - b);
  return joltageAdapters[joltageAdapters.length - 1] + 3;
};

const getDistribution = (joltageAdapters) => {
  const highestRatedAdapter = getHighestRatedAdapter(joltageAdapters);

  const distribution = {
    oneJolt: 1, // count plugging the 1st adapter into the 0 port
    threeJolt: 0,
  };

  for (let i = 0; i < joltageAdapters.length; i += 1) {
    const joltageAdapter = joltageAdapters[i];
    const maxAdapterJoltage = joltageAdapter + 3;
    const validAdapters = joltageAdapters.slice(i + 1).filter((adapter) => adapter <= maxAdapterJoltage);
    const nextAdapter = validAdapters.length > 0 ? validAdapters[0] : highestRatedAdapter;

    const countDifference = nextAdapter - joltageAdapter;

    if (countDifference === 3) {
      distribution.threeJolt += 1;
    } else if (countDifference === 1) {
      distribution.oneJolt += 1;
    } else {
      console.log('WTF');
    }
  }
  return distribution;
};

const getPossibleArrangementsCount = (joltageAdapters) => {
  joltageAdapters.sort((a, b) => a - b);

  return Math.max(...joltageAdapters
    .sort((a, b) => a - b)
    .map(Number)
    .reduce((arrangements, adapter) => {
      // eslint-disable-next-line no-param-reassign
      arrangements[adapter] = (arrangements[adapter - 1] || 0) + (arrangements[adapter - 2] || 0) + (arrangements[adapter - 3] || 0);
      return arrangements;
    },
    [Math.min(...joltageAdapters)])
    .flat());
};

module.exports = async () => {
  const inputString = fs.readFileSync('./input/10th-thursday.txt', 'utf8');

  const joltageAdapters = inputString.split('\n').map((number) => parseInt(number, 10));

  const distribution = getDistribution(joltageAdapters);
  const possibleArrangements = getPossibleArrangementsCount(joltageAdapters);

  return {
    partOne: distribution.oneJolt * distribution.threeJolt,
    partTwo: possibleArrangements,
  };
};
