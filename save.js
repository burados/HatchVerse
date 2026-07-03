import { player } from "./player.js";

const SAVE_KEY = "hatchverse_save";

export function saveGame() {
    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(player)
    );
}

export function loadGame() {

    const data = localStorage.getItem(SAVE_KEY);

    if (!data) return;

    try {

        const save = JSON.parse(data);

        player.coins = save.coins ?? 1000;
        player.gems = save.gems ?? 0;
        player.pets = save.pets ?? [];
        player.equipped = save.equipped ?? [];

    } catch (e) {

        console.error("Save corrupted:", e);

        localStorage.removeItem(SAVE_KEY);

    }

}

export function resetGame() {

    localStorage.removeItem(SAVE_KEY);

    player.coins = 100;
    player.gems = 0;
    player.pets = [];
    player.equipped = [];

    location.reload();

}