import { pets } from "./pets.js";

export const starterEgg = {
    price: 100,
    chances: [
        0, 0, 0, 0,
        1, 1,
        2,
        3
    ]
};

export function hatchStarterEgg() {
    const index = starterEgg.chances[
        Math.floor(Math.random() * starterEgg.chances.length)
    ];

    return pets[index];
}