const ItemHandler = require("./ItemHandler");
const CoinHandler = require("./CoinHandler");

module.exports = class VendingMachine {
  constructor(rows, cols) {
    this.slot = new ItemHandler(rows, cols);
    this.coins = new CoinHandler(this);
  }
};
