module.exports = class CoinHandler {
  constructor() {
    this.stock = { nickels: 100,
    dimes: 100,
    quarters: 200,
    loonies: 50,
    toonies: 50,
    }

    this.
  }

  restock() {
    const balance =
      this.nickels * 5 +
      this.dimes * 10 +
      this.quarters * 25 +
      this.loonies * 100 +
      this.toonies * 200;

    this.nickels = 100;
    this.dimes = 100;
    this.quarters = 200;
    this.loonies = 50;
    this.toonies = 50;

    const newBalance =
      this.nickels * 5 +
      this.dimes * 10 +
      this.quarters * 25 +
      this.loonies * 100 +
      this.toonies * 200;
    console.log(
      `💸💸💸$${Number.toFixed(
        (balance - newBalance) / 100
      )} was collected 💸💸💸`
    );
  }
};
