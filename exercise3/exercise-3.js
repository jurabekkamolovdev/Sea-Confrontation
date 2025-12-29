import { Ship } from "../exercise1/exercise-1.js";
import { Board } from "../exercise2/exercise-2.js";

export class Player {
    constructor(name, boardSize) {
        this._name = name;
        this._boardSize = boardSize;

        this._board = new Board(this.boardSize);
    }

    get name() { return this._name; }
    set name(name) { return this._name = name; }

    get boardSize() { return this._boardSize; }
    set boardSize(boardSize) { this._boardSize = boardSize; }

    get board() { return this._board; }
    set board(board) { this._board = board; }

    placeShips(shipName, length, isVertical, startPosition) {
        const ship = new Ship(shipName, length, isVertical);

        this.board.placeShip(ship, startPosition.x, startPosition.y);
    }

    takeTurn(opponent) {
        const [x, y] = prompt("Hujum uchun kordinata bering (x y)")
                                        .split(" ")
                                        .map(num => Number(num));
        return {
            opponent, x, y
        };
    }
}

const [name, boardSize] = prompt("Ism va board o'lchami:").split(" ");
const player = new Player(name, Number(boardSize));
console.log(`"${player.name}", ${player.boardSize}`);