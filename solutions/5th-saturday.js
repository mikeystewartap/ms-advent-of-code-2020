/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
const fs = require('fs');

const maxRowCount = 127;
const maxColumnCount = 7;

const getValueFromRange = (rangeString, maxCount, lowerChar) => {
  let minRange = null;
  let maxRange = null;
  let lastChar = '';
  for (let i = 0; i < rangeString.length; i += 1) {
    const char = rangeString[i];

    if (i === 0) {
      if (char === lowerChar) {
        minRange = 0;
        maxRange = Math.floor(maxCount / 2);
      } else {
        minRange = Math.ceil(maxCount / 2);
        maxRange = maxCount;
      }
    } else {
      const rangeDiff = maxRange - minRange;
      const halfOfDiff = Math.floor(rangeDiff / 2);
      minRange = char === lowerChar ? minRange : minRange + +halfOfDiff;
      maxRange = char === lowerChar ? maxRange - halfOfDiff : maxRange;
    }

    lastChar = char;
  }

  return lastChar === lowerChar ? minRange : maxRange;
};

const getRow = (partitionString) => {
  const rowDataString = partitionString.slice(0, 7);
  return getValueFromRange(rowDataString, maxRowCount, 'F');
};
const getColumn = (partitionString) => {
  const columnDataString = partitionString.slice(7);
  return getValueFromRange(columnDataString, maxColumnCount, 'L');
};
const getSeatId = (row, column) => row * 8 + column;

module.exports = async () => {
  const inputString = await fs.readFileSync('./input/5th-saturday.txt', 'utf8');
  const boardingPasses = inputString.split('\n').map((partitionString) => {
    const row = getRow(partitionString);
    const column = getColumn(partitionString);
    return {
      partitionString,
      row,
      column,
      seatId: getSeatId(row, column),
    };
  });

  // Part 1
  const boardingPassesSortedBySeatId = boardingPasses.sort((a, b) => ((a.seatId > b.seatId) ? 1 : -1));

  const partTwo = [];

  return {
    partOne: boardingPassesSortedBySeatId[boardingPassesSortedBySeatId.length - 1].seatId,
    partTwo: partTwo.length,
  };
};
