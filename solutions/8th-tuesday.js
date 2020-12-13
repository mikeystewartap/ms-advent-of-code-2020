/* eslint-disable max-len */
const fs = require('fs');

const executeInstructions = (instructions) => {
  let accumulator = 0;
  const runHistory = [];
  for (let i = 0; i < instructions.length; i += 1) {
    if (runHistory.includes(i)) {
      return accumulator;
    }

    runHistory.push(i);

    const instruction = instructions[i];

    switch (instruction.type) {
      case 'acc':
        accumulator += instruction.stepChangeCount;
        break;
      case 'jmp':
        i += (instruction.stepChangeCount - 1);
        break;
      case 'nop':
      default:
        // do nothing
        break;
    }
  }
  return 0;
};

const breakInfiniteLoop = (instructions) => {
  let accumulator = 0;
  let runHistory = [];
  const changeLog = [];
  let hasChangedSinceReset = false;

  for (let i = 0; i < instructions.length; i += 1) {
    if (!runHistory.includes(i)) {
      runHistory.push(i);
    } else {
      i = 0;
      runHistory = [];
      accumulator = 0;
      hasChangedSinceReset = false;
    }

    const instruction = instructions[i];

    let change = false;
    if (!changeLog.includes(i) && instruction.type !== 'acc' && !hasChangedSinceReset) {
      change = true;
      hasChangedSinceReset = true;
      changeLog.push(i);
    }

    switch (instruction.type) {
      case 'acc':
        accumulator += instruction.stepChangeCount;
        break;
      case 'jmp':
        if (!change) {
          i += (instruction.stepChangeCount - 1);
        }
        break;
      case 'nop':
      default:
        if (change) {
          i += (instruction.stepChangeCount - 1);
        }
        // do nothing
        break;
    }
  }

  return accumulator;
};

module.exports = async () => {
  const inputString = await fs.readFileSync('./input/8th-tuesday.txt', 'utf8');

  const instructions = inputString.split('\n').map((instructionString) => ({
    type: instructionString.split(' ')[0],
    stepChangeCount: parseInt(instructionString.split(' ')[1], 10),
  }));

  const partOne = executeInstructions(instructions);
  const partTwo = breakInfiniteLoop(instructions);

  return {
    partOne,
    partTwo,
  };
};
