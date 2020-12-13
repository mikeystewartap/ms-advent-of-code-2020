/* eslint-disable max-len */
const fs = require('fs');

const isAbleToContainShinyGoldBag = (bagRules, bagRule) => {
  const { bagName, bagContents } = bagRule;

  // check the current bag
  if (bagName === 'shiny gold') return false;

  // does this bag contain a shiny gold bag
  const containsShinyGoldBag = bagContents.find((subBag) => subBag.bagName === 'shiny gold');
  if (typeof containsShinyGoldBag !== 'undefined') return true;

  // check is this bags contents contains a bag that can also contain a shiny gold bag
  const subBagsContainingShinyGoldBags = bagContents.filter((subBagRule) => {
    const parentBagRule = bagRules.find((pb) => pb.bagName === subBagRule.bagName);
    const inParentBagContents = typeof parentBagRule.bagContents.find((pb) => pb.bagName === 'shiny gold') !== 'undefined';
    if (inParentBagContents) {
      return true;
    }
    const result = isAbleToContainShinyGoldBag(bagRules, parentBagRule);
    return result;
  });

  return subBagsContainingShinyGoldBags.length > 0;
};

const countAllBagsUsed = (bagRules, bagRuleName) => {
  const bagRule = bagRules.find((pb) => pb.bagName === bagRuleName);
  const { bagContents } = bagRule;
  let totalBagCount = 0;

  for (let i = 0; i < bagContents.length; i += 1) {
    const bag = bagContents[i];
    const currentBagRule = bagRules.find((pb) => pb.bagName === bag.bagName);
    const totalBagsUsedCount = countAllBagsUsed(bagRules, currentBagRule.bagName);
    totalBagCount += bag.bagQuantity;
    totalBagCount += bag.bagQuantity * totalBagsUsedCount;
  }

  return totalBagCount;
};

module.exports = async () => {
  const inputString = await fs.readFileSync('./input/7th-monday.txt', 'utf8');
  const bagRules = inputString.split('\n').map((bagString) => {
    const bagParts = bagString.split(' bags contain ');
    const bagName = bagParts[0].trim();
    const bagContents = bagParts[1].replace('.', '').trim() !== 'no other bags' ? bagParts[1].trim().split(',').map((subBag) => ({
      bagName: subBag.replace('.', '').replace('bags', '').replace('bag', '').trim()
        .slice(2),
      bagQuantity: parseInt(subBag.replace('.', '').trim().slice(0, 1), 10),
    })) : [];
    return {
      bagName,
      bagContents,
    };
  });

  const bagsCanContainShinyGoldBag = bagRules.filter((bag) => isAbleToContainShinyGoldBag(bagRules, bag));

  const partOne = bagsCanContainShinyGoldBag.length;
  const partTwo = countAllBagsUsed(bagRules, 'shiny gold');

  return {
    partOne,
    partTwo,
  };
};
