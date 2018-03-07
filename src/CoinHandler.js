module.exports = class CoinHandler {
  constructor(machine) {
    this.maxCoinStock = 500;
    this.stock = {
      nickel: 100,
      dime: 100,
      quarter: 200,
      loonie: 50,
      toonie: 50
    };
    this.m = machine;
    this.input = {
      nickel: 0,
      dime: 0,
      quarter: 0,
      loonie: 0,
      toonie: 0
    };
  }
  insertCoin(coin) {
    if (
      this.stock.nickel <= 10 ||
      this.stock.dime <= 10 ||
      this.stock.quarter <= 20 ||
      this.stock.loonie <= 5 ||
      this.stock.toonie <= 5 ||
      this.stock.nickel >= 500 ||
      this.stock.dime >= 500 ||
      this.stock.quarter >= 500 ||
      this.stock.loonie >= 500 ||
      this.stock.toonie >= 500
    )
      throw new Error(`Machine needs servicing. Please call 1-800-RESTOCK`);
    if (
      typeof coin !== "string" ||
      !(
        coin === "nickel" ||
        coin === "dime" ||
        coin === "quarter" ||
        coin === "loonie" ||
        coin === "toonie"
      )
    )
      throw new Error(`Invalid input, to mimic a coin, pass in one of these strings 'nickel' , 'dime' , 'quarter' , 'loonie' , 'toonie'
    coin received was ${coin}`);
    switch (coin) {
      case "nickel": {
        this.input.nickel += 1;
        break;
      }
      case "dime": {
        this.input.dime += 1;
        break;
      }
      case "quarter": {
        this.input.quarter += 1;
        break;
      }
      case "loonie": {
        this.input.loonie += 1;
        break;
      }
      case "toonie": {
        this.input.toonie += 1;
        break;
      }
    }
  }

  makeSelection(id) {
    if (
      this.stock.nickel <= 10 ||
      this.stock.dime <= 10 ||
      this.stock.quarter <= 20 ||
      this.stock.loonie <= 5 ||
      this.stock.toonie <= 5 ||
      this.stock.nickel >= 500 ||
      this.stock.dime >= 500 ||
      this.stock.quarter >= 500 ||
      this.stock.loonie >= 500 ||
      this.stock.toonie >= 500
    )
      throw new Error(`Machine needs servicing. please call 1-800-RESTOCK`);
    if (!this.m.slot[id])
      throw new Error("Invalid selection: no such selection exists.");
    const slot = this.m.slot[id];
    if (slot.stock <= 0) throw new Error(`SLOT-${id}: Out of Stock`);
    const inputTotal = this.addCoins(this.input);
    if (slot.price > inputTotal)
      throw new Error(
        `SLOT-${id}: Insuffient funds. Please add $${(
          (slot.price - inputTotal) /
          100
        ).toFixed(2)}`
      );
    const change = inputTotal - slot.price;
    this.addInputToStock();
    const item = slot.dispense();
    const changeCoins = this.dispenseChange(change);
    console.log(
      `Item from ${item} and $${(change / 100).toFixed(2)} dispensed. Enjoy!`
    );
    return { item, change: changeCoins };
  }

  addInputToStock() {
    this.stock.nickel += this.input.nickel;
    this.stock.dime += this.input.dime;
    this.stock.quarter += this.input.quarter;
    this.stock.loonie += this.input.loonie;
    this.stock.toonie += this.input.toonie;
    this.emptyInput();
  }

  subtractOutputFromStock(output) {
    this.stock.nickel -= output.nickel;
    this.stock.dime -= output.dime;
    this.stock.quarter -= output.quarter;
    this.stock.loonie -= output.loonie;
    this.stock.toonie -= output.toonie;
  }

  dispenseChange(change) {
    const output = {
      nickel: 0,
      dime: 0,
      quarter: 0,
      loonie: 0,
      toonie: 0
    };
    output.toonie = Math.floor(change / 200);
    change = change % 200;
    output.loonie = Math.floor(change / 100);
    change = change % 100;
    output.quarter = Math.floor(change / 25);
    change = change % 25;
    output.dime = Math.floor(change / 10);
    change = change % 10;
    output.nickel = Math.floor(change / 5);
    this.subtractOutputFromStock(output);

    const addedOutput = this.addCoins(output);

    console.log(`$${(addedOutput / 100).toFixed(2)} was returned.`);
    return output;
  }

  addCoins(input) {
    return (
      input.nickel * 5 +
      input.dime * 10 +
      input.quarter * 25 +
      input.loonie * 100 +
      input.toonie * 200
    );
  }
  emptyInput() {
    this.input.nickel = 0;
    this.input.dime = 0;
    this.input.quarter = 0;
    this.input.loonie = 0;
    this.input.toonie = 0;
  }

  coinReturn() {
    const change = { ...this.input };
    const input = this.addCoins(this.input);
    this.emptyInput();
    console.log(`$${(input / 100).toFixed(2)} was returned.`);
    return change;
  }

  getBalence() {
    return this.addCoins(this.stock);
  }
  restock() {
    const stock = this.addCoins(this.stock);

    this.stock.nickel = 100;
    this.stock.dime = 100;
    this.stock.quarter = 200;
    this.stock.loonie = 50;
    this.stock.toonie = 50;

    const newStock = this.addCoins(this.stock);
    console.log(
      `💸💸💸$${((stock - newStock) / 100).toFixed(2)} was collected 💸💸💸`
    );
  }
};
