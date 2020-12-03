const fs = require('fs');

const TREE = '#';

const getTreeCount = (options) => {
  const { rows, squareCount, rowCount } = options;

  const rowLength = rows[0].length;
  let currentPositionInRow = squareCount + 1;
  let treesFound = 0;

  for (let i = 0; rows.length > i; i += rowCount) {
    if (i > 0) {
      const row = rows[i];

      // if we get to the end of the row we need to start again
      // at the beginning of the next row
      if (currentPositionInRow > rowLength) {
        currentPositionInRow -= rowLength;
      }

      const space = row[currentPositionInRow - 1];
      if (space === TREE) {
        treesFound += 1;
      }

      currentPositionInRow += squareCount;
    }
  }

  return treesFound;
};

module.exports = async () => {
  const inputString = await fs.readFileSync('./input/3rd-thursday.txt', 'utf8');
  const rows = inputString.split('\n');

  // Part 1
  const treesFoundPartOne = getTreeCount({
    rows, squareCount: 3, rowCount: 1,
  });

  // Part 2
  const treesFoundPartTwoOneSquare = getTreeCount({
    rows, squareCount: 1, rowCount: 1,
  });

  const treesFoundPartTwoFiveSquare = getTreeCount({
    rows, squareCount: 5, rowCount: 1,
  });

  const treesFoundPartTwoSevenSquare = getTreeCount({
    rows, squareCount: 7, rowCount: 1,
  });
  const treesFoundPartTwoOneSquareTwoRows = getTreeCount({
    rows, squareCount: 1, rowCount: 2,
  });

  const partTwo = treesFoundPartTwoOneSquare
  * treesFoundPartTwoFiveSquare
  * treesFoundPartOne
  * treesFoundPartTwoSevenSquare
  * treesFoundPartTwoOneSquareTwoRows;

  return {
    partOne: treesFoundPartOne,
    partTwo,
  };
};
