/* eslint-disable max-len */
const fs = require('fs');

const preambleCount = 25;

const isValid = (preambleNumbers, cypherNumber) => {
  for (let i = 0; i < preambleNumbers.length; i += 1) {
    const preambleNumber = preambleNumbers[i];
    for (let subI = 0; subI < preambleNumbers.length; subI += 1) {
      const subPreambleNumber = preambleNumbers[subI];
      if (preambleNumber !== subPreambleNumber) {
        const calcResult = +preambleNumber + +subPreambleNumber;
        if (calcResult === cypherNumber) {
          return true;
        }
      }
    }
  }

  return false;
};

module.exports = async () => {
  const inputString = await fs.readFileSync('./input/9th-wednesday.txt', 'utf8');

  const cypherNumbers = inputString.split('\n').map((number) => parseInt(number, 10));

  let partOne = 0;

  for (let i = preambleCount; i < cypherNumbers.length; i += 1) {
    const cypherNumber = cypherNumbers[i];
    const preambleNumbers = cypherNumbers.slice(i - preambleCount, i);
    if (!isValid(preambleNumbers, cypherNumber)) {
      partOne = cypherNumber;
      break;
    }
  }

  let partTwo = 0;

  const cypherNumbersFiltered = cypherNumbers.filter((number) => partOne > number);

  let contiguousSet = [];
  let contiguousSetValue = 0;
  for (let i = 0; i < cypherNumbersFiltered.length; i += 1) {
    const cypherNumber = cypherNumbersFiltered[i];

    contiguousSet.push(cypherNumber);

    contiguousSetValue = contiguousSet.reduce((a, b) => a + b, 0);

    // we need to move 1 along the array as we've gone over the limit
    if (contiguousSetValue > partOne) {
      for (let setI = 0; contiguousSetValue > partOne; setI += 1) {
        contiguousSet = contiguousSet.slice(1);
        contiguousSetValue = contiguousSet.reduce((a, b) => a + b, 0);
      }
    }

    if (contiguousSetValue === partOne) {
      contiguousSet.sort((a, b) => a - b);
      partTwo = contiguousSet[0] + contiguousSet[contiguousSet.length - 1];
      break;
    }
  }

  return {
    partOne,
    partTwo,
  };
};
