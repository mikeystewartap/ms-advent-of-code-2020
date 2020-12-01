const fs = require('fs');

module.exports = async () => {
  const inputString = await fs.readFileSync('./input/1st-tuesday.txt', 'utf8');
  const expenses = inputString.split('\n');

  // Part 1
  const weirdExpenses = [];
  for (let i = 0; expenses.length > i; i += 1) {
    const expense = expenses[i];

    for (let subI = 0; expenses.length > subI; subI += 1) {
      const subExpense = expenses[subI];
      const calculatedExpense = (+expense + +subExpense);

      if (calculatedExpense === 2020) {
        weirdExpenses.push(expense);
        weirdExpenses.push(subExpense);
        break;
      }
    }
    // end loop we've found the weird expense
    if (weirdExpenses.length > 0) {
      break;
    }
  }

  // Part 2
  for (let i = 0; expenses.length > i; i += 1) {
    const expense = expenses[i];

    for (let subI = 0; expenses.length > subI; subI += 1) {
      const subExpense = expenses[subI];

      for (let subSubI = 0; expenses.length > subSubI; subSubI += 1) {
        const subSubExpense = expenses[subSubI];
        const calculatedExpense = (+expense + +subExpense + +subSubExpense);

        if (calculatedExpense === 2020) {
          weirdExpenses.push(expense);
          weirdExpenses.push(subExpense);
          weirdExpenses.push(subSubExpense);
          break;
        }
      }

      // end loop we've found the weird expense
      if (weirdExpenses.length > 2) {
        break;
      }
    }
    // end loop we've found the weird expense
    if (weirdExpenses.length > 2) {
      break;
    }
  }

  return {
    partOne: weirdExpenses[0] * weirdExpenses[1],
    partTwo: weirdExpenses[2] * weirdExpenses[3] * weirdExpenses[4],
  };
};
