import { Player } from "../exercise3/exercise-3.js";

class HumanPlayer extends Player {
    constructor(name, boardSize) {
        super(name, boardSize);
    }

    placeShips(shipName, length, isVertical, startPosition) {
        console.log(`Inson o‘yinchi ${shipName} joylashtiryapti`);
        super.placeShips(shipName, length, isVertical, startPosition);
    }

    takeTurn(opponent) {
    const [x, y] = prompt(
        "Inson o‘yinchi hujum qiladi (x y):"
    )
        .split(" ")
        .map(Number);

    return { opponent, x, y };
    }
}

const human = new HumanPlayer("Макс", 10);
console.log(human.name, human.boardSize);
