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
      const halfOfDiffUp = Math.ceil(rangeDiff / 2);
      const halfOfDiffDown = Math.floor(rangeDiff / 2);
      minRange = char === lowerChar ? minRange : minRange + +halfOfDiffUp;
      maxRange = char === lowerChar ? maxRange - halfOfDiffDown - 1 : maxRange;
    }

    lastChar = char;
  }
  return (lastChar === lowerChar ? minRange : maxRange);
};

const getRow = (partitionString) => {
  const rowDataString = partitionString.slice(0, 7);
  return getValueFromRange(rowDataString, maxRowCount, 'F');
};
const getColumn = (partitionString) => {
  const columnDataString = partitionString.slice(7);
  return getValueFromRange(columnDataString, maxColumnCount, 'L');
};
const getSeatId = (row, column) => row * 8 + +column;

const getMissingTicketId = (boardingPasses) => {
  const seatIds = [];
  boardingPasses.forEach((boardingPass) => {
    seatIds.push(boardingPass.seatId);
  });

  for (let i = 0; i < seatIds.length; i += 1) {
    const seat = seatIds[i];
    const seatAsIndex = seat - 6;

    if (i !== seatAsIndex) {
      return seat - 1;
    }
  }
  return 0;
};

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

  const boardingPassesSortedBySeatId = boardingPasses.sort((a, b) => ((a.seatId > b.seatId) ? 1 : -1));

  const partOne = boardingPassesSortedBySeatId[boardingPassesSortedBySeatId.length - 1].seatId;
  const partTwo = getMissingTicketId(boardingPasses);

  return {
    partOne,
    partTwo,
  };
};
