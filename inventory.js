import { player } from "./player.js";

export function addPet(pet) {

    const existing = player.pets.find(p => p.id === pet.id);

    if (existing) {
        existing.amount++;
    } else {
        player.pets.push({
            ...pet,
            amount: 1
        });
    }

}

export function equipPet(id) {

    if (player.equipped.length >= 5) return false;

    const pet = player.pets.find(p => p.id === id);

    if (!pet || pet.amount <= 0) return false;

    pet.amount--;

    player.equipped.push({
        id: pet.id,
        name: pet.name,
        rarity: pet.rarity,
        income: pet.income,
        emoji: pet.emoji
    });

    return true;
}

export function unequipPet(slotIndex) {

    const equipped = player.equipped[slotIndex];

    if (!equipped) return;

    player.equipped.splice(slotIndex, 1);

    const pet = player.pets.find(p => p.id === equipped.id);

    if (pet) {
        pet.amount++;
    } else {
        player.pets.push({
            ...equipped,
            amount: 1
        });
    }

}

export function getIncome() {

    return player.equipped.reduce((sum, pet) => sum + pet.income, 0);

}

export function equipBest(){

    // Возвращаем всех питомцев обратно
    player.equipped.forEach(pet=>{

        const inv=player.pets.find(p=>p.id===pet.id);

        if(inv){

            inv.amount++;

        }

    });

    player.equipped=[];

    // Сортировка по доходу
    const sorted=[...player.pets]
        .sort((a,b)=>b.income-a.income);

    for(const pet of sorted){

        while(pet.amount>0 && player.equipped.length<5){

            pet.amount--;

            player.equipped.push({
                id:pet.id,
                name:pet.name,
                rarity:pet.rarity,
                income:pet.income,
                emoji:pet.emoji
            });

        }

    }

}