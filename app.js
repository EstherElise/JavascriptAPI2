import { fight } from "./function.js";

//Henter verdier fra inputfelt
const heroNameInput = document.getElementById("character-name");
const heroHpInput = document.getElementById("character-hp");
const heroAdInput = document.getElementById("attack-damage");

//Henter alle bildene med alternativ tekst "Bilde"
const heroImage = document.querySelectorAll("[alt^='Bilde']");
//Valgt bilde
let selectedHero;

//Henter knappene
const btnCreateChar = document.getElementById("create-character");
const btnGenerateEnemy = document.getElementById("generate-enemy");
const btnStartFight = document.getElementById("start-fight");

//Henter kampområdet
const battleArena = document.getElementById("battle-area");

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
};

//Profilkortet til helten som blir synlig på nettsiden
function displayHero() {
  //Fjerner helt om det allerede ligger en der
  document.getElementById("character-display")?.remove();
  //Henter helt fra localStorage
  const getHero = localStorage.getItem("Helt");
  const hero = JSON.parse(getHero);
  
  //Mapping av alt tekst til bildefil
  const heroImageMap = {
    "Bilde 1": "./assets/death-knight.jpg",
    "Bilde 2": "./assets/hunter.jpg",
    "Bilde 3": "./assets/mage.jpg"
  };

  //Lager html elementene
  const divHero = document.createElement("div");
  divHero.setAttribute("id", "character-display");
  divHero.className = "profile-card";

  const headingHero = document.createElement("h2");
  headingHero.textContent = "Helt";

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
  //Fjerner gammelt resultat før en ny kamp
  const removeText = document.getElementById("battle-result");
  removeText.textContent = "";
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
};

//Profilkortet til fienden som blir synlig på nettsiden
function displayEnemy() {
  //Fjerner fiende dersom det allerede ligger en der
  document.getElementById("enemy-fight-display")?.remove();
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
  //Fjerner gammelt resultat før en ny kamp
  const removeText = document.getElementById("battle-result");
  removeText.textContent = "";
  generateEnemy(e)
});

//Knapp: sammenligner HP
btnStartFight.addEventListener("click", function () {
  const result = document.getElementById("battle-result");
  const hero = JSON.parse(localStorage.getItem("Helt"));
  const chosenEnemy = JSON.parse(localStorage.getItem("Fiende"));
  const fightResult = fight(hero, chosenEnemy);
  result.textContent = fightResult;
});