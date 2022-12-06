const { readFile } = require("fs/promises");
const testsA = [
  { input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", key: 7 },
  { input: "bvwbjplbgvbhsrlpgdmjqwftvncz", key: 5 },
  { input: "nppdvjthqldpwncqszvftbrmjlhg", key: 6 },
  { input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", key: 10 },
  { input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", key: 11 },
];
const testsB = [
  { input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", key: 19 },
  { input: "bvwbjplbgvbhsrlpgdmjqwftvncz", key: 23 },
  { input: "nppdvjthqldpwncqszvftbrmjlhg", key: 23 },
  { input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", key: 29 },
  { input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", key: 26 },
];

const findMarker = (input, threshold = 4) => {
  const chars = input.split("");
  let uniques = [];
  for (const index in chars) {
    while (uniques.some((unique) => unique === chars[index])) {
      uniques = uniques.slice(1);
    }
    uniques.push(chars[index]);
    if (uniques.length === threshold) return Number(index) + 1;
  }
};
console.log(testsA.map(({ input, key }) => findMarker(input) === key));
console.log(testsB.map(({ input, key }) => findMarker(input, 14) === key));
readFile("input.txt", { encoding: "utf-8" }).then(findMarker).then(console.log);
readFile("input.txt", { encoding: "utf-8" })
  .then((data) => findMarker(data, 14))
  .then(console.log);
