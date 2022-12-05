const { readFile } = require("fs/promises");

const testData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getStacks = (rawStacks) =>
  rawStacks
    .split("\n")
    .at(-1)
    .split(" ")
    .filter((value) => value)
    .reduce((stacks, column) => ({ ...stacks, [column]: [] }), {});

const getIndices = (rawStacks) =>
  rawStacks
    .split("\n")
    .at(-2)
    .split("")
    .map((char, index) => (alphabet.indexOf(char) >= 0 ? index : null))
    .filter((char) => char);

const populateStacks = (rawStacks, stacks, indices) => {
  rawStacks
    .split("\n")
    .splice(0, rawStacks.split("\n").length - 1)
    .reverse()
    .forEach((row) =>
      indices.forEach(
        (index, column) =>
          row[index] !== " " && stacks[column + 1].push(row[index])
      )
    );
  return stacks;
};

const exectueInstructions = (instructions, stacks, single = true) =>
  instructions
    .split("\n")
    .map((row) =>
      row
        .split(" ")
        .map((number) => Number(number))
        .filter((number) => number >= 0)
    )
    .forEach(([move, from, to]) => {
      if (single) {
        for (let index = 0; index < move; index++) {
          stacks[to].push(stacks[from].pop());
        }
      } else {
        stacks[to] = stacks[to].concat(
          stacks[from].splice(stacks[from].length - move)
        );
      }
    });

const getResult = (stacks) =>
  Object.values(stacks)
    .map((column) => column.at(-1))
    .join("");

const test = (part, result, key) =>
  console.log(
    `Test part ${part}: ${
      result === key ? "OK" : "NOT, expected: " + key + ", got: " + result
    }`
  );

const [rawTestStacks, testInstructions] = testData.split("\n\n");
const testStacksA = populateStacks(
  rawTestStacks,
  getStacks(rawTestStacks),
  getIndices(rawTestStacks)
);
const testStacksB = populateStacks(
  rawTestStacks,
  getStacks(rawTestStacks),
  getIndices(rawTestStacks)
);

exectueInstructions(testInstructions, testStacksA);
exectueInstructions(testInstructions, testStacksB, false);
test("A", getResult(testStacksA), "CMZ");
test("B", getResult(testStacksB), "MCD");

readFile("input.txt", { encoding: "utf-8" }).then((raw) => {
  const [rawStacks, instructions] = raw.split("\n\n");
  const stacks = populateStacks(
    rawStacks,
    getStacks(rawStacks),
    getIndices(rawStacks)
  );
  const stacksB = { ...stacks };
  Object.keys(stacksB).forEach(
    (column) => (stacksB[column] = [...stacksB[column]])
  );
  exectueInstructions(instructions, stacks);
  exectueInstructions(instructions, stacksB, false);
  console.log(getResult(stacks));
  console.log(getResult(stacksB));
});
