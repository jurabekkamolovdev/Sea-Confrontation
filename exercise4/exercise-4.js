import { Player } from "../exercise3/exercise-3.js";
import { AIPlayer } from "../exercise6/exercise-6.js"

class App {
    constructor(boardSize, maxShipLength, maxShipCount) {
        this._boardSize = boardSize;
        this._maxShipLength = maxShipLength;
        this._maxShipCount = maxShipCount;
        this._firstPlayer = null;
        this._secondPlayer = null;
    }

    get boardSize() { return this._boardSize; }
    set boardSize(size) { this._boardSize = size; }

    get maxShipLength() { return this._maxShipLength; }
    set maxShipLength(length) { this._maxShipLength = length; }

    get maxShipCount() { return this._maxShipCount; }
    set maxShipCount(count) { this._maxShipCount = count; }

    get firstPlayer() { return this._firstPlayer; }
    set firstPlayer(player) { this._firstPlayer = player; }

    get secondPlayer() { return this._secondPlayer; }
    set secondPlayer(player) { this._secondPlayer = player; }

    shipArrangement(player, shipCount, maxShipLength) {
        if(shipCount > this.maxShipCount) {
            return 'Error';
        }
        if(maxShipLength > this.maxShipLength) {
            return 'Error';
        }

        for(let i = 0; i < shipCount; i++) {
            const shipName = prompt(`${player.name} ${i+1} - Kemani nomini kiriting:`);
            const shipLength = Number(prompt(`Max:${this.maxShipLength} ${player.name} ${i+1}-Kemani uzunligini kiriting:`));
            const shipOrientation = Number(prompt(`${player.name} ${i+1} - Kema (Horizontal - 0) (Vertical - 1):`));
            const [x, y] = prompt(`${player.name} ${i+1} - Kemani start pozitsiyalari x va y:`)
                                            .split(" ")
                                            .map(num => Number(num));
            player.placeShips(shipName, shipLength, shipOrientation, {x: x, y: y});
            
            console.log(`${player.name} ${shipCount} ${shipLength} ${x},${y} ${shipOrientation}`);
        }
    }

    run() {

        const isAi = Number(prompt("1 - Odam vs Odam, 0 - Odam vs AI:"));

        if (isAi === 0) {
            const firstPlayerName = prompt("O'yinchi ismingizni kiriting:"); 

            this.firstPlayer = new Player(firstPlayerName, this._boardSize);
            this.secondPlayer = new AIPlayer("AI", this._boardSize);

            console.log(`O'yinchilar: ${this.firstPlayer.name} vs ${this.secondPlayer.name}`);

            this.shipArrangement(this.firstPlayer, this.maxShipCount, this.maxShipLength);

            for(let i = 0; i < this._maxShipCount; i++) {
                const length = Math.floor(Math.random() * this._maxShipLength) + 1;
                this.secondPlayer.placeShips(`AI-ShipNumber-${i+1}`, length);
            }
            console.log(`${this.secondPlayer.name} kemalarini joylashtirdi`);
        } else {
        const firstPlayerName = prompt("1 - o'yinchi ismingizni kiriting:");
        const secondPlayerName = prompt("2 - o'yinchi ismingizni kiriting:");

        this.firstPlayer = new Player(firstPlayerName, this.boardSize);
        this.secondPlayer = new Player(secondPlayerName, this.boardSize);

        this.shipArrangement(this.firstPlayer, this.maxShipCount, this.maxShipLength);
        this.shipArrangement(this.secondPlayer, this.maxShipCount, this.maxShipLength);
        }



        let currentPlayer = this.firstPlayer;
        let opponentPlayer = this.secondPlayer;

        while(true) {
            const {opponent, x, y} = currentPlayer.takeTurn(opponentPlayer);
            const hit = opponent.board.receiveAttack(x, y);
            
            if(hit === true) {
                console.log(`${currentPlayer.name} to'g'ri urdi!`);
                const allSunk = opponent.board.ships.every(ship => ship.isSunk());

                if(allSunk) {

                    console.log(`🎉 ${currentPlayer.name} yutdi! 🎉`);
                    break;
                } 
            } else {
                console.log(`${currentPlayer.name} urdisi bo'sh o'tdi`);
            }
            
            [currentPlayer, opponentPlayer] = [opponentPlayer, currentPlayer];
        }
    }
}

const app = new App(5, 3, 1);
app.run();