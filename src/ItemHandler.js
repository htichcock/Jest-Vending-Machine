const ItemSlot = require("./ItemSlot.js");

module.exports = class ItemHandler {
  constructor(rows, cols) {
    if (
      rows > 20 ||
      cols > 20 ||
      rows <= 0 ||
      cols <= 0 ||
      !Number.isInteger(rows) ||
      !Number.isInteger(cols)
    )
      throw new Error(`Rows and columns must be postive integers below 21.
      rows had value of ${rows}
      cols had value of ${cols}`);
    const alpha = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T"
    ];
    for (let i = 0; i < rows; i++) {
      for (let j = 1; j <= cols; j++) {
        const code = alpha[i] + j;
        this[code] = new ItemSlot(code);
      }
    }
  }
};
