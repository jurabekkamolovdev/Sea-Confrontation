import { Player } from "../exercise3/exercise-3";
import { Board } from "../exercise2/exercise-2";

class App {
    constructor(boardSize, maxShipLength, maxShipCount) {
        this._boardSize = boardSize;
        this._maxShipLength = maxShipLength;
        this._maxShipCount = maxShipCount;

        this.firstPlayer = null;
        this.secondPlayer = null;
    }

    get boardSize() {
        return this._boardSize;
    }

    set boardSize(size) {
        this._boardSize = size;
    }

    get maxShipLength() {
        return this._maxShipLength;
    }

    set maxShipLength(length) {
        this._maxShipLength = length;
    }

    get maxShipCount() {
        return this._maxShipCount;
    }

    set maxShipCount(count) {
        this._maxShipCount = count;
    }

    shipArrangement(player, shipCount, maxShipLength) {
        if(shipCount > this.maxShipCount) {
            return 'Error';
        }
        if(maxShipLength > this.maxShipLength) {
            return 'Error';
        }

        for(let i = 0; i < shipCount; i++) {
            const shipName = prompt(`${player.playerName} ${i+1} - Kemani nomini kiriting:`);
            const shipLength = Number(prompt(`${player.playerName} ${i+1} - Kemani uzunligini kiriting kiriting:`));
            const shipOrientation = Number(prompt(`${player.playerName} ${i+1} - Kema (Hozintal - 0) (Vertical - 1):`));
            const [x, y] = prompt(`${player.playerName} ${i+1} - Kemani start pozitsiyalri x va y:`)
                                            .split(" ")
                                            .map(num => Number(num));
            player.placeShips(shipName, shipLength, shipOrientation, {x: x, y: y});
        }
    }

    run() {
        const firstPlayerName = prompt("1 - o'yinchi ismingizni kiriting:");
        const secondPlayerName = prompt("2 - o'yinchi ismingizni kiriting:");

        this.firstPlayer = new Player(firstPlayerName, this.boardSize);
        this.secondPlayer = new Player(secondPlayerName, this.boardSize);

        this.shipArrangement(this.firstPlayer, this.maxShipCount, this.maxShipLength);
        this.shipArrangement(this.secondPlayer, this.maxShipCount, this.maxShipLength);

        let currentPlayer = this.firstPlayer;
        let opponentPlayer = this.secondPlayer;

        while(true) {
            const {opponent, x, y} = currentPlayer.takeTurn(opponentPlayer);

            const hit = opponent.board.receiveAttack(x, y);
            
            if(hit === true) {
                const allSunk = opponent.board.ships.every(ship => ship.shipIsSunk());

                if(allSunk) {
                    console.log(`Win ${currentPlayer.playerName}`);
                    break;
                }

                [currentPlayer, opponentPlayer] = [opponentPlayer, currentPlayer];
            }



        }
    }
}