//Her kommer din Javascript-kode. Kommentarene er lagt til for å hjelpe deg med å dele opp oppgavene,
// du kan slette disse hvis du ønsker.

// Del 1: Lag karakter og lagre karakteren i localStorage

//Seksjon 2: Generer fiende

// Seksjon 3: Sloss!
//Du skal vise frem helten og fienden. Se HTML-dokumentet for hvordan fremvisningen skal se ut, med tanke på hvilke tagger, hierarki og hvilke klasser de skal ha.
//Du skal lage den strukturen som vist i HTML, her i Javascript og legge de til i div'en "battle-arena" fra HTML.


document.addEventListener("DOMContentLoaded", () => {


  const heroNameInput = document.getElementById("character-name");
  const heroHpInput = document.getElementById("character-hp");
  const heroAdInput = document.getElementById("attack-damage");
  //Henter alle bildene med alternativ tekst "Bilde"
  const heroImage = document.querySelectorAll("[alt^='Bilde']");
  //Valgt bilde
  let selectedHero;
  
  //Henter knappene som legger til helt og fiende
  const btnCreateChar = document.getElementById("create-character");
  const btnGenerateEnemy = document.getElementById("generate-enemy");
  //Henter knapp som starter kampen
  const btnStartFight = document.getElementById("start-fight");
  
  //Henter kampområdet
  const battleArena = document.getElementById("battle-area");
  
  //Resetter kampen
  function resetFight() {
    document.getElementById("battle-area").textContent = "";
  };
  
  
  //Funksjon som gjør at bildet man trykker på blir valgt
  heroImage.forEach(function (heroImage) {
    heroImage.addEventListener("click", function () {
    selectedHero = heroImage.attributes.alt.value
    });
  });

  //Henter verdiene fra inputfeltene og legger inn i localStorage
  function createChar() {
    const character = { 
      Navn: heroNameInput.value, 
      HP: Math.floor(heroHpInput.value), 
      Angrepsstyrke: Math.floor(heroAdInput.value), 
      Profilbilde: selectedHero
    };
    localStorage.setItem("Helt", JSON.stringify(character))
    displayHero();
    // generateEnemy();
    // resetFight();
  };
  
  //Profilkortet til helten som blir synlig på nettsiden
  function displayHero() {
    //Henter helt fra localStorage
    const getHero = localStorage.getItem("Helt");
    const hero = JSON.parse(getHero);
    
    // //Mapping av alt tekst til bildefil
    const heroImageMap = {
      "Bilde 1": "/assets/death-knight.jpg",
      "Bilde 2": "/assets/hunter.jpg",
      "Bilde 3": "/assets/mage.jpg"
    };
  
    battleArena.innerhtml = "";
      const divHero = document.createElement("div");
      divHero.setAttribute("id", "character-display");
      divHero.className = "profile-card";
  
      const headingHero = document.createElement("h2");
      headingHero.textContent = "Helt";
  
      //Midlertidig bilde. Sliter med å hente fra localStorage
      const imgHero = document.createElement("img");
      imgHero.setAttribute("id", "char-img");
      imgHero.alt = "Profilbilde";
      imgHero.src = heroImageMap[hero.Profilbilde];
  
      const charName = document.createElement("p");
      charName.setAttribute("id", "char-name");
      charName.textContent = `Navn: ${hero.Navn}`;
  
      const charHP = document.createElement("p");
      charHP.setAttribute("id", "char-hp");
      charHP.textContent = `HP: ${hero.HP}`;
  
      const charAttack = document.createElement("p");
      charAttack.setAttribute("id", "char-attack");
      charAttack.textContent = `Angrepsstyrke: ${hero.Angrepsstyrke}`;
  
      battleArena.appendChild(divHero);
      divHero.append(headingHero, imgHero, charName, charHP, charAttack);
    };
  
  //Knapp: Lager karakter og legger den på battlearenaen
  btnCreateChar.addEventListener("click", (e) => {
    createChar(e)
  });
  
  //Genererer tilfeldig fiende og legger til i localStorage
  function generateEnemy() {
    const enemies = [
      { name: "Sumpmonster", image: "assets/swamp-monster.jpg" },
      { name: "Drage", image: "assets/dragon.jpg" },
      { name: "Orc", image: "assets/monster.jpg" }
    ]
  
    const enemy = enemies[Math.floor(Math.random() * enemies.length)];
    const hpEnemy = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
    const attackEnemy = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
  
    const generatedEnemy = {
      Navn: enemy.name,
      HP: hpEnemy,
      Angrepsstyrke: attackEnemy,
      Profilbilde: enemy.image
    };
    localStorage.setItem("Fiende", JSON.stringify(generatedEnemy));
    displayEnemy();
    // displayHero();
    // resetFight();
  };
  
  function displayEnemy() {
    const getEnemy = localStorage.getItem("Fiende");
    const chosenEnemy = JSON.parse(getEnemy);
    const divEnemy = document.createElement("div");
    divEnemy.setAttribute("id", "enemy-fight-display");
    divEnemy.className = "profile-card";
  
    const headingEnemy = document.createElement("h2");
    headingEnemy.textContent = "Fiende";
  
    const imgEnemy = document.createElement("img");
    imgEnemy.setAttribute("id", "enemy-fight-img");
    imgEnemy.alt = "Fiendens profilbilde";
    imgEnemy.src = chosenEnemy.Profilbilde;
  
    const enemyName = document.createElement("p");
    enemyName.setAttribute("id", "enemy-fight-name");
    enemyName.textContent = `Navn: ${chosenEnemy.Navn}`;
  
    const enemyHP = document.createElement("p");
    enemyHP.setAttribute("id", "enemy-fight-hp");
    enemyHP.textContent = `HP: ${chosenEnemy.HP}`;
  
    const enemyAttack = document.createElement("p");
    enemyAttack.setAttribute("id", "enemy-fight-attack");
    enemyAttack.textContent = `Angrepsstyrke: ${chosenEnemy.Angrepsstyrke}`;
  
    battleArena.appendChild(divEnemy);
    divEnemy.append(headingEnemy, imgEnemy, enemyName, enemyHP, enemyAttack);
  };
  
  //Knapp: Generer fiende
  btnGenerateEnemy.addEventListener("click", (e) => {
    generateEnemy(e)
  });
  
  //Array med mulige resultater
  const results = [
    "Du vant!",
    "Du tapte",
    "Uavgjort"
  ]
  
  //Kampen
 function fight(hero, chosenEnemy) {
    const result = document.getElementById("battle-result");
    // const getHero = localStorage.getItem("Helt");
    // const hero = JSON.parse(getHero);
    // const getEnemy = localStorage.getItem("Fiende");
    // const chosenEnemy = JSON.parse(getEnemy);
    const heroMinusAttack = hero.HP - chosenEnemy.Angrepsstyrke;
    const enemyMinusAttack = chosenEnemy.HP - hero.Angrepsstyrke;
  
    if (heroMinusAttack > enemyMinusAttack) {
      return result.textContent = results[0];
    }
    if (enemyMinusAttack > heroMinusAttack) {
      return result.textContent = results[1];
    }
    if (heroMinusAttack === enemyMinusAttack) {
      return result.textContent === results[2];
    }
  }
  
  //Knapp: sammenligner HP
  btnStartFight.addEventListener("click", function () {
    const hero = JSON.parse(localStorage.getItem("Helt"));
    const chosenEnemy = JSON.parse(localStorage.getItem("Fiende"));
    fight(hero, chosenEnemy);
  });
  
  function add(a, b) {
    return a + b;
  }
  module.exports = { add, fight }

});