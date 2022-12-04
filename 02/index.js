/**
 * rock    1 A X
 * paper   2 B Y
 * scissor 3 C Z
 *
 * win  6
 * draw 3
 * lost 0
 *
 * x Lose
 * y draw
 * z win
 */
//const ROCK = 0, PAPER = 1, SCISSOR = 2
//const opponentMoves = 'ABC'
const playerMoves = "XYZ";

const results = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};
const resultsB = {
  A: { X: "Z", Y: "X", Z: "Y" },
  B: { X: "X", Y: "Y", Z: "Z" },
  C: { X: "Y", Y: "Z", Z: "X" },
};

const { readFile } = require("fs/promises");

readFile("input.txt", { encoding: "utf8" })
  .then((data) =>
    data.split("\n").reduce(
      (tot, curr) => {
        const [opponent, player] = curr.split(" ");
        return [
          (tot[0] +=
            results[opponent][player] + playerMoves.indexOf(player) + 1),
          (tot[1] +=
            playerMoves.indexOf(resultsB[opponent][player]) +
            1 +
            playerMoves.indexOf(player) * 3),
        ];
      },
      [0, 0]
    )
  )
  .then((result) => console.log(result));
