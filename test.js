let guestsSeated = 5;


let seatsRemaining = 10;

let guestsRemaining = 7;


while (seatsRemaining > 0 && guestsRemaining > 0) {

    guestsSeated++;

    seatsRemaining--;

    guestsRemaining--;

}

console.log(guestsSeated)