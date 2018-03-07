module.exports = class ItemSlot {
  constructor(id) {
    this.price = 200; //$2 default
    this.stock = 20; // 20 default
    this.id = id;
  }

  setPrice(newPrice) {
    if (
      newPrice % 5 !== 0 ||
      !Number.isInteger(newPrice) ||
      newPrice > 350 ||
      newPrice < 0
    )
      throw new Error(
        `SLOT-${this.id}: 
        Price must be in cents, divisible by 5 for payment in nickels, and between 0 and 350 cents. We are a reasonable vending machine company. 
        newPrice had a value of ${newPrice}`
      );
    this.price = newPrice;
  }
  getPrice() {
    return this.price;
  }

  addStock(stock) {
    if (!Number.isInteger(newPrice) || stock < 0)
      throw new Error(
        `SLOT-${this.id}: 
        Stock must be a positive integer.
        stock was ${stock}`
      );
    this.stock += stock;
    if (this.stock > 20) {
      this.stock = 20;
      //console log to replace display.
      console.log(`SLOT-${this.id}: 
      The maximum stock is 20. The stock has been set to 20.`);
    }
  }

  getStock() {
    console.log(`SLOT-${this.id}: ${this.stock} in stock`);
    return this.stock;
  }

  dispense() {
    if (this.stock <= 0)
      throw new Error(
        `SLOT-${this.id}: 
      Out of stock. Please phone 1-800-RESTOCK and request a servicing`
      );
    this.stock -= 1;
    return this.id;
  }
};
