const machine = require("../src/VendingMachine.js");

describe("VendingMachine", () => {
  describe("insert non string coin", () => {
    test("should throw error", () => {
      expect(() => {
        let m = new machine(8, 8);
        m.coins.insertCoin(0.25);
      }).toThrowError(/Invalid input/);
    });
  });

  describe("insert non coin", () => {
    test("should throw error", () => {
      expect(() => {
        let m = new machine(8, 8);
        m.coins.insertCoin("test");
      }).toThrowError(/Invalid input/);
    });
  });

  describe("When insert quarter", () => {
    test("input should add one quarter", () => {
      let m = new machine(8, 8);
      m.coins.insertCoin("quarter");
      expect(m.coins.input.quarter).toEqual(1);
    });
  });

  describe("when make bad selection", () => {
    test("should throw error", () => {
      expect(() => {
        let m = new machine(8, 8);
        m.coins.makeSelection("55");
      }).toThrowError(/Invalid selection/);
    });
  });

  describe("When make good selection without funds", () => {
    test("should throw error", () => {
      expect(() => {
        let m = new machine(8, 8);
        m.coins.makeSelection("A5");
      }).toThrowError(/Insuffient funds/);
    });
  });

  describe("When make good selection with funds", () => {
    test("to reduce stock of slot by one", () => {
      let m = new machine(8, 8);
      m.coins.insertCoin("toonie");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      expect(m.slot.A5.stock).toEqual(19);
    });
  });

  describe("When make good selection with funds", () => {
    test("to dispense right change", () => {
      let m = new machine(8, 8);
      m.coins.insertCoin("toonie");
      m.coins.insertCoin("dime");
      m.coins.insertCoin("dime");
      m.coins.insertCoin("dime");
      m.coins.insertCoin("dime");
      m.coins.insertCoin("dime");
      expect(m.coins.makeSelection("A5").change).toEqual({
        nickel: 0,
        dime: 0,
        quarter: 2,
        loonie: 0,
        toonie: 0
      });
    });
  });

  describe("When make good selection with funds", () => {
    test("to add right amount of $ to stock", () => {
      let m = new machine(8, 8);
      m.coins.insertCoin("toonie");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      expect(m.coins.getBalence()).toEqual(21700);
    });
  });

  describe("When coin return", () => {
    test("input should be empty", () => {
      let m = new machine(8, 8);
      m.coins.insertCoin("toonie");
      m.coins.insertCoin("toonie");
      expect(m.coins.coinReturn()).toEqual({
        nickel: 0,
        dime: 0,
        quarter: 0,
        loonie: 0,
        toonie: 2
      });
      expect(m.coins.addCoins(m.coins.input)).toEqual(0);
    });
  });

  describe("When restocking coins", () => {
    test("to add right amount of $ to stock", () => {
      let m = new machine(8, 8);
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.restock();
      expect(m.coins.getBalence()).toEqual(21500);
    });
  });

  describe("When restock slot", () => {
    test("to add right amount of items to stock", () => {
      let m = new machine(8, 8);
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.slot.A5.addStock(2);
      expect(m.slot.A5.stock).toEqual(18);
    });
  });

  describe("When restock slot with bad input", () => {
    test("to error", () => {
      let m = new machine(8, 8);
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");

      expect(() => m.slot.A5.addStock("2")).toThrowError(
        /Stock must be a positive integer/
      );
    });
  });

  describe("When over stock slot", () => {
    test("to set stock to 20", () => {
      let m = new machine(8, 8);
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.coins.insertCoin("toonie");
      m.coins.makeSelection("A5");
      m.slot.A5.addStock(5);
      expect(m.slot.A5.stock).toEqual(20);
    });
  });
});
