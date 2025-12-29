import { Ship } from "../exercise1/exercise-1.js";


class Board {
    constructor(size) {
        this._size = size;
        this._grid = Array.from({length: size}, () => new Array(size).fill(null));
        this._ships = [];
    }

    get size() { return this._size; }
    set size(size) { this._size = size; }


    get grid() { return this._grid; }
    set grid(grid) { this._grid = grid; }

    get ships() { return this._ships; }
    set ships(ships) { this._ships = ships; }

    placeShip(ship, x, y) {
        if(ship.shipOrientation === 0) {
            for(let i = 0; i < ship.length; i++) {
                this._grid[x][y + i] = ship;
            }
        } else {
            for(let i = 0; i < ship.length; i++) {
                this._grid[x + i][y] = ship;
            }
        }
        
        ship.startPosition = {x, y};
        this._ships.push(ship);
    }

    findAvailableCells() {
        const result = [];
        for(let i = 0; i < this._size; i++) {
            for(let j = 0; j < this._size; j++) {
                if(this._grid[i][j] === null) {
                    result.push({ x: i, y: j });
                }
            }
        }
        return result;
    }

    receiveAttack(x, y) {
        const ship = this._grid[x][y];
        if(ship === null) {
            return false;
        }
        
        let hitPosition;
        if(ship.orientation === 0) {
            hitPosition = y - ship.startPosition.y;
        } else {
            hitPosition = x - ship.startPosition.x;
        }
        
        ship.hit(hitPosition);
        return true;
    }

    display() {
        for(let i = 0; i < this._size; i++) {
            let temp = '';
            for(let j = 0; j < this._size; j++) {
                const cell = this._grid[i][j];
                if(cell === null) {
                    temp += 'O';
                } else {
                    let hitPosition;
                    if(cell.orientation === 0) {
                        hitPosition = j - cell.startPosition.y;
                    } else {
                        hitPosition = i - cell.startPosition.x;
                    }
                    temp += cell.hits[hitPosition] ? 'X' : 'S';
                }
            }
            console.log(temp);
        }
    }
}


const boardSize = Number(prompt("Board hajmini kiriting:"));
const board = new Board(boardSize);
const ship = new Ship("ShipTest", 3, 0);
board.placeShip(ship, 0, 0);
console.log(`${board.size}, ${board.receiveAttack(1, 0)}`);