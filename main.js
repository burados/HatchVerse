import { player } from "./player.js";
import { starterEgg, hatchStarterEgg } from "./eggs.js";

import { addPet } from "./inventory.js";
import { addCoins, passiveIncome, eggClick, spendCoins } from "./economy.js";

import { updateUI } from "./ui.js";

import { saveGame, loadGame } from "./save.js";

import { resetGame } from "./save.js";

// ---------- Загрузка ----------
loadGame();
updateUI();

// ---------- Навигация ----------
document.querySelectorAll(".nav-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".screen")
            .forEach(screen =>
                screen.classList.remove("active-screen")
            );

        document.querySelectorAll(".nav-btn")
            .forEach(button =>
                button.classList.remove("active")
            );

        document
            .getElementById(btn.dataset.screen)
            .classList.add("active-screen");

        btn.classList.add("active");

    });

});

// ---------- Клик по яйцу ----------
document
.getElementById("mainEgg")
.addEventListener("click",()=>{

    eggClick();

    saveGame();

    updateUI();

});

// ---------- Открытие яйца ----------
const popup=document.getElementById("petPopup");

const popupName=document.getElementById("popupPetName");

const popupRarity=document.getElementById("popupPetRarity");

const popupIncome=document.getElementById("popupPetIncome");

document
.getElementById("openEggBtn")
.addEventListener("click",()=>{

    if(!spendCoins(starterEgg.price)){
        alert("Not enough coins!");
        return;
    }

    const pet=hatchStarterEgg();

    addPet(pet);

    popupName.textContent=`${pet.emoji} ${pet.name}`;
    popupRarity.textContent=pet.rarity;
    popupIncome.textContent=`+${pet.income}/sec`;

    popup.classList.remove("hidden");

    saveGame();

    updateUI();

});

// ---------- Закрытие попапа ----------
document
.getElementById("closePopup")
.addEventListener("click",()=>{

    popup.classList.add("hidden");

});

// ---------- Доход ----------
setInterval(()=>{

    passiveIncome();

    saveGame();

    updateUI();

},1000);

// --------- Ресет Прогресса ----------
const resetBtn = document.getElementById("resetGameBtn");

resetBtn.addEventListener("click", () => {

    const confirmReset = confirm(
        "⚠️ Delete all progress?\n\nThis action cannot be undone."
    );

    if (!confirmReset) return;

    resetGame();

});

