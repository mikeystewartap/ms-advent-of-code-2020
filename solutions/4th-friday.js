/* eslint-disable max-len */
const fs = require('fs');

const BIRTH_YEAR = 'byr';
const ISSUE_YEAR = 'iyr';
const EXPIRATION_YEAR = 'eyr';
const HEIGHT = 'hgt';
const HAIR_COLOR = 'hcl';
const EYE_COLOR = 'ecl';
const PASSPORT_ID = 'pid';
const COUNTRY_ID = 'cid';

const requiredFields = [
  BIRTH_YEAR,
  ISSUE_YEAR,
  EXPIRATION_YEAR,
  HEIGHT,
  HAIR_COLOR,
  EYE_COLOR,
  PASSPORT_ID,
].sort();

const possibleEyeColours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const getPassportsFromCredentials = (inputString) => inputString.split('\n\n').map((credentialsString) => {
  const credentials = credentialsString.replace('\n', ',').replace(/\s/g, ',').split(',').sort();

  const passport = {};
  credentials.forEach((unknownDataString) => {
    const unknownDataParts = unknownDataString.split(':');
    const key = unknownDataParts[0];
    const value = unknownDataParts[1];
    passport[key] = value;
  });

  return passport;
});

const isValidBirthYear = (value) => parseInt(value, 10) >= 1920 && parseInt(value, 10) <= 2002;

const isValidIssueYear = (value) => parseInt(value, 10) >= 2010 && parseInt(value, 10) <= 2020;

const isValidExpirationYear = (value) => parseInt(value, 10) >= 2020 && parseInt(value, 10) <= 2030;

const isValidHeight = (value) => {
  const measurement = value.match(/\d+/g)[0];
  if (measurement === null) return false;

  const unitOfMeasurement = value.slice(measurement.length).trim();

  switch (unitOfMeasurement) {
    case 'in':
      return parseInt(measurement, 10) >= 59 && parseInt(measurement, 10) <= 76;
    case 'cm':
      return parseInt(measurement, 10) >= 150 && parseInt(measurement, 10) <= 193;
    default:
      return false;
  }
};

const isValidHairColor = (value) => {
  const color = value.replace('#', '');
  const hashSymbol = value.slice(0, 1);
  if (hashSymbol !== '#') return false;
  const colourMatch = color.replace('#', '').match(/[0-9A-Fa-f]{6}/g);
  return color !== null && color.length === 6 && colourMatch !== null && colourMatch.length > 0;
};

const isValidEyeColour = (value) => possibleEyeColours.includes(value);

const isValidPassportId = (value) => !value.isNaN && value.length === 9 && parseInt(value, 10) > 0;

const isKeyValueValid = (key, value) => {
  switch (key) {
    case BIRTH_YEAR:
      return isValidBirthYear(value);
    case ISSUE_YEAR:
      return isValidIssueYear(value);
    case EXPIRATION_YEAR:
      return isValidExpirationYear(value);
    case HEIGHT:
      return isValidHeight(value);
    case HAIR_COLOR:
      return isValidHairColor(value);
    case EYE_COLOR:
      return isValidEyeColour(value);
    case PASSPORT_ID:
      return isValidPassportId(value);
    case COUNTRY_ID:
      // ignored
      return true;
    default:
      return false;
  }
};

const isValidPassportValues = (passport) => {
  const passportFields = Object.keys(passport);
  const invalidKeys = passportFields.filter((key) => !isKeyValueValid(key, passport[key]));
  return invalidKeys.length === 0;
};

const isValidPassport = (passport) => {
  const passportFields = Object.keys(passport);
  return requiredFields.filter((field) => !passportFields.includes(field)).length === 0;
};

module.exports = async () => {
  const inputString = await fs.readFileSync('./input/4th-friday.txt', 'utf8');
  const passports = getPassportsFromCredentials(inputString);

  // Part 1
  const validPassports = passports.filter(isValidPassport);

  // Part 2
  const validPassportsAndValues = validPassports.filter(isValidPassportValues);

  return {
    partOne: validPassports.length,
    partTwo: validPassportsAndValues.length,
  };
};
