import { Player } from "../exercise3/exercise-3.js";

export class AIPlayer extends Player {
    constructor(name, boardSize) {
        super(name, boardSize);
    }

    placeShips(shipName, length) {
        const availableCells = this.board.findAvailableCells();

        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const start = availableCells[randomIndex];

        const vertical = Number(Math.random() > 0.5);

        super.placeShips(shipName, length, vertical, start);
    }

    takeTurn(opponent) {
        const x = Math.floor(Math.random() * this._boardSize);
        const y = Math.floor(Math.random() * this._boardSize);

        return {
            opponent, x, y
        }
    }
}

const aiPlayer = new AIPlayer("Ai", 10);
console.log(aiPlayer.name);