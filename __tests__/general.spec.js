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
});
