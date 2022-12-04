const { readFile } = require("fs/promises");

readFile("input.txt", { encoding: "utf8" }).then((data) => {
  const result = data
    .split("\n\n")
    .map((group) =>
      group.split("\n").reduce((tot, val) => (tot += Number(val)), 0)
    )
    .sort((a, b) => b - a);
  console.log(result[0]);
  console.log(result.splice(0, 3).reduce((tot, val) => (tot += val), 0));
});
