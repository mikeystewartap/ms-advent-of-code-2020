const fs = require('fs');

module.exports = async () => {
  const inputString = await fs.readFileSync('./input/2nd-wednesday.txt', 'utf8');

  const passwords = inputString.split('\n').map((rawPasswordData) => {
    const passwordInfo = rawPasswordData.split(' ');
    const characterCountMinMax = passwordInfo[0].split('-');
    return {
      characterCountMin: parseInt(characterCountMinMax[0], 10),
      characterCountMax: parseInt(characterCountMinMax[1], 10),
      character: passwordInfo[1].replace(':', '').trim(),
      value: passwordInfo[2].trim(),
    };
  });

  // Part 1
  const validPasswordsPartOne = passwords.filter((password) => {
    const charCount = password.value.split(password.character).length - 1;
    return charCount >= password.characterCountMin && charCount <= password.characterCountMax;
  });

  // Part 2
  const validPasswordsPartTwo = passwords.filter((password) => {
    const characterOneValue = password.value[password.characterCountMin - 1];
    const characterTwoValue = password.value[password.characterCountMax - 1];

    let validCharCount = 0;
    if (characterOneValue === password.character) {
      validCharCount += 1;
    }
    if (characterTwoValue === password.character) {
      validCharCount += 1;
    }
    return validCharCount === 1;
  });

  return {
    partOne: validPasswordsPartOne.length,
    partTwo: validPasswordsPartTwo.length,
  };
};
