const { add, fight } = require("../app");

test("fff", () => {
  expect(add(5, 10)).toBe(15);
});

describe("Battle outcome", () => {
  test("Helten vinner", () => {
    
  })

  test("Fienden vinner", () => {
    
  })

  test("Uavgjort", () => {
    
  })

})

// test("Hero wins", () => {
//   localStorage.setItem("Helt", JSON.stringify({ name: "Hero", HP: 120 }));
//   localStorage.setItem("Fiende", JSON.stringify({ name: "Enemy", HP: 100 }));
//   expect(fight(hero1.Hp > chosenEnemy1.Hp)).toBe(results[0]);
// });

// test("Enemy wins", () => {
//   localStorage.setItem("Helt", JSON.stringify({ name: "Hero", HP: 90 }));
//   localStorage.setItem("Fiende", JSON.stringify({ name: "Enemy", HP: 110 }));
//   expect(fight()).toBe(results[1]);
// });

// test("Tie", () => {
//   localStorage.setItem("Helt", JSON.stringify({ name: "Hero", HP: 100 }));
//   localStorage.setItem("Fiende", JSON.stringify({ name: "Enemy", HP: 100 }));
//   expect(fight()).toBe(results[3]);
// });