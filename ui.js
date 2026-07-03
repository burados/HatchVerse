import { player } from "./player.js";
import { equipPet, unequipPet, getIncome } from "./inventory.js";
import { saveGame } from "./save.js";
import { equipBest } from "./inventory.js";

const coinsText = document.getElementById("coins");
const gemsText = document.getElementById("gems");
const incomeText = document.getElementById("income");

const petsList = document.getElementById("petsList");
const equipSlots = document.getElementById("equipSlots");

export function updateUI() {
    coinsText.textContent = Math.floor(player.coins);
    gemsText.textContent = player.gems;
    incomeText.textContent = getIncome() + "/сек";

    renderEquip();
    renderPets();
}

function renderEquip() {
    equipSlots.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const slot = document.createElement("div");
        slot.className = "slot";

        if (player.equipped[i]) {
            const pet = player.equipped[i];

            slot.textContent = pet.emoji;

            slot.onclick = () => {
                unequipPet(i);
                saveGame();
                updateUI();
            };
        }

        equipSlots.appendChild(slot);
    }
}

function renderPets() {
    petsList.innerHTML = "";

    player.pets.forEach(pet => {

        const card = document.createElement("div");
        card.className = "pet-card";

        card.innerHTML = `
            <div class="pet-emoji" style="font-size:40px">${pet.emoji}</div>
            <div class="pet-name">${pet.name}</div>
            <div class="pet-info">
                ${pet.rarity}<br>
                +${pet.income}/сек<br>
                x${pet.amount}
            </div>
        `;

        card.onclick = () => {
            if (equipPet(pet.id)) {
                saveGame();
                updateUI();
            }
        };

        petsList.appendChild(card);

    });
}

const equipBestBtn=document.getElementById("equipBestBtn");

equipBestBtn.onclick=()=>{

    equipBest();

    saveGame();

    updateUI();

};