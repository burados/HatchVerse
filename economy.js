import { player } from "./player.js";
import { getIncome } from "./inventory.js";

export function addCoins(amount) {
    player.coins += amount;
}

export function spendCoins(amount) {

    if (player.coins < amount) {
        return false;
    }

    player.coins -= amount;
    return true;
}

export function eggClick() {
    addCoins(1);
}

export function passiveIncome() {
    addCoins(getIncome());
}

