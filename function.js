//Kampen
export function fight(hero, chosenEnemy) {
  //Array med mulige resultater
  const results = [
    "Du vant!",
    "Du tapte",
    "Uavgjort"
  ];

  const heroMinusAttack = hero.HP - chosenEnemy.Angrepsstyrke;
  const enemyMinusAttack = chosenEnemy.HP - hero.Angrepsstyrke;
  if (heroMinusAttack > enemyMinusAttack) {
    return results[0];
  }
  if (enemyMinusAttack > heroMinusAttack) {
    return results[1];
  }
  if (heroMinusAttack === enemyMinusAttack) {
    return results[2];
  }

};