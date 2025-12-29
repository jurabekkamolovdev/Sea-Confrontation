// import { Ship } from "../exercise1/exercise-1.js";


export class Board {
    constructor(size) {
        this.size = size;
        this.grid = Array.from({length: size}, () => new Array(size).fill(null));
        this.ships = [];
    }

    get boardSize() {
        return this.size;
    }

    get boardGrid() {
        return this.grid;
    }

    get boardShips() {
        return this.ships;
    }

    placeShip(ship, x, y) {
        const startX = x;
        const startY = y;
        
        if(ship.shipOrientation === 0) {
            for(let i = 0; i < ship.shipLength; i++) {
                this.grid[x][y + i] = ship;
            }
        } else {
            for(let i = 0; i < ship.shipLength; i++) {
                this.grid[x + i][y] = ship;
            }
        }
        
        ship.shipStartPosition = {x: startX, y: startY};
        this.ships.push(ship);
    }

    findAvailableCells() {
        const result = [];

        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                if(this.grid[i][j] === null) {
                    result.push(`{x:${i}, y:${j}}`);
                }
            }
        }
        return result;
    }

    receiveAttack(x, y) {
        const ship = this.grid[x][y];
        if(ship === null) {
            return false;
        }
        
        let hitPosition;
        if(ship.shipOrientation === 0) {
            hitPosition = y - ship.shipStartPosition.y;
        } else {
            hitPosition = x - ship.shipStartPosition.x;
        }
        
        ship.shipHit(hitPosition);
        return true;
    }

    display() {
        for(let i = 0; i < this.size; i++) {
            let temp = '';
            for(let j = 0; j < this.size; j++) {
                const cell = this.grid[i][j];
                if(cell === null) {
                    temp += 'O';
                } else {
                    let hitPosition;
                    if(cell.shipOrientation === 0) {
                        hitPosition = j - cell.shipStartPosition.y;
                    } else {
                        hitPosition = i - cell.shipStartPosition.x;
                    }
                    
                    if(cell.shipHits[hitPosition]) {
                        temp += 'X';
                    } else {
                        temp += 'S';
                    }
                }
            }
            console.log(temp);
        }
    }
}


// const boardSize = Number(prompt("Board hajmini kiriting:"));
// const board = new Board(boardSize);

// const ship = new Ship("ShipTest", 3, 0);
// board.placeShip(ship, 0, 0);

// console.log(`${board.boardSize}, ${board.receiveAttack(0, 0)}`);