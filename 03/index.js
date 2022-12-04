const { readFile } = require("fs/promises");

const test = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const alphabet = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const format = (input) =>
  input
    .split("\n")
    .map((row) => [row.slice(0, row.length / 2), row.slice(row.length / 2)]);
const existInOther = (input, searchText) => searchText.indexOf(input) >= 0;
const existInAll = (input, searchArray) =>
  searchArray.filter((item) => existInOther(input, item)).length ===
  searchArray.length;

const groupByThree = (input) =>
  input.reduce(
    (groupedByThree, current) =>
      groupedByThree.at(-1).length < 3
        ? groupedByThree.at(-1).push(current) && groupedByThree
        : [...groupedByThree, [current]],
    [[]]
  );

const getTotalValue = (input) =>
  input
    .map((rucksack) =>
      rucksack[0]
        .split("")
        .filter((itemType) => existInOther(itemType, rucksack[1]))
    )
    .map((items) =>
      items.reduce((uniques, item) =>
        uniques.includes(item) ? uniques : [...uniques, item]
      )
    )
    .map((letter) => alphabet.indexOf(letter))
    .reduce((total, current) => (total += current), 0);

const getGroupdValue = (input) =>
  groupByThree(input.split("\n"))
    .map(([search, ...rest]) =>
      search.split("").filter((letter) => existInAll(letter, rest))
    )
    .map((items) =>
      items.reduce((uniques, item) =>
        uniques.includes(item) ? uniques : [...uniques, item]
      )
    )
    .map((letter) => alphabet.indexOf(letter))
    .reduce((total, current) => (total += current), 0);

const testResult = getTotalValue(format(test));
console.log(
  `First part is: ${
    testResult === 157 ? "OK" : "wrong, expected  157 got : " + testResult
  }`
);

const testSecond = getGroupdValue(test);
console.log(
  `Second part is: ${
    testSecond === 70 ? "OK" : "wrong, expected  70 got : " + testSecond
  }`
);

readFile("input.txt", { encoding: "utf-8" })
  .then((data) => format(data))
  .then((data) => getTotalValue(data))
  .then((result) => console.log(result));

readFile("input.txt", { encoding: "utf-8" }).then((data) =>
  console.log(getGroupdValue(data))
);
