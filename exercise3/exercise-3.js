// import { Ship } from "../exercise1/exercise-1.js";
// import { Board } from "../exercise2/exercise-2.js";

export class Player {
    constructor(name, boardSize) {
        this.name = name;
        this.boardSize = boardSize;

        this.board = new Board(this.boardSize);
    }

    get playerName() {
        return this.name;
    }

    get playerBoardSize() {
        return this.boardSize;
    }

    get playerBoard() {
        return this.board;
    }

    set playerName(name) {
        this.name = name;
    }

    set playerBoardSize(boardSize) {
        this.boardSize = boardSize;
    }

    placeShips(shipName, length, isVertical, startPosition) {
        const ship = new Ship(shipName, length, isVertical);

        this.board.placeShip(ship, startPosition.x, startPosition.y);
    }

    takeTurn(opponent) {
        const [positionX, positionY] = prompt("Hujum uchun kordinata bering (x y)")
                                        .split(" ")
                                        .map(num => Number(num));
        return {
            opponent: opponent,
            x: positionX,
            y: positionY
        }
    }
}

// const [name, boardSize] = prompt("Ismingizni va Board o'lachamini kiriting (Maks 5)").split(" ");
// const player = new Player(name, Number(boardSize));
// console.log(`"${player.playerName}", ${player.boardSize}`);