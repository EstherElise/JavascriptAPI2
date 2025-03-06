import { fight } from "../function";

describe("Battle outcome", () => {
  test("Helten vinner", () => {
    const hero = {
      HP: 180,
      Angrepsstyrke: 60
    }
    const enemy = {
      HP: 80,
      Angrepsstyrke: 20
    }

    expect(fight(hero, enemy)).toBe("Du vant!");
  });

  test("Fienden vinner", () => {
    const hero = {
      HP: 80,
      Angrepsstyrke: 60
    }
    const enemy = {
      HP: 180,
      Angrepsstyrke: 20
    }

    expect(fight(hero, enemy)).toBe("Du tapte");
  });

  test("Uavgjort", () => {
    const hero = {
      HP: 100,
      Angrepsstyrke: 60
    }
    const enemy = {
      HP: 100,
      Angrepsstyrke: 60
    }

    expect(fight(hero, enemy)).toBe("Uavgjort");
    
  });

});