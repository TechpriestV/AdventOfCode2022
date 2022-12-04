const { readFile } = require("fs/promises");
const test = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
48-49,48-50`;

const format = (rawData) =>
  rawData
    .split("\n")
    .map((row) =>
      row
        .split(",")
        .map((pair) => pair.split("-").map((number) => Number(number)))
    );

const sortPairs = (pairA, pairB) => pairA[0] - pairB[0] || pairB[1] - pairA[1];

const getCoveredPairs = (formatedData) =>
  formatedData
    .map((row) => row.sort(sortPairs))
    .filter(([pairA, pairB]) => pairA[1] >= pairB[1]);

const getPartiallyCoveredPairs = (formatedData) =>
  formatedData
    .map((row) => row.sort(sortPairs))
    .filter(([pairA, pairB]) => pairA[1] >= pairB[0]);

const formatedTest = format(test);

const testResult = getCoveredPairs(formatedTest);
console.log(testResult);
console.log("part one: ", testResult.length === 3);
console.log("part two: ", getPartiallyCoveredPairs(formatedTest).length === 5);

readFile("input.txt", { encoding: "utf-8" })
  .then(format)
  .then(getCoveredPairs)
  .then((result) => console.log(result.length));

readFile("input.txt", { encoding: "utf-8" })
  .then(format)
  .then(getPartiallyCoveredPairs)
  .then((result) => console.log(result.length));
