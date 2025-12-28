import { Player } from "../exercise3/exercise-3";

class App {
    constructor(boardSize, maxShipLength, maxShipCount) {
        this.boardSize = boardSize;
        this.maxShipLength = maxShipLength;
        this.maxShipCount = maxShipCount;

        this.firstPlayer;
        this.secondPlayer;
    }

    get boardSize() {
        return this.boardSize;
    }

    get maxShipLength() {
        return this.maxShipLength;
    }

    get maxShipCount() {
        return this.maxShipCount;
    }

    set boardSize(size) {
        this.boardSize = size;
    }

    set maxShipLength(shipLength) {
        this.maxShipLength = shipLength;
    }

    set maxShipCount(shipCount) {
        this.maxShipCount = shipCount;
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

        this.shipArrangement(this.firstPlayer, maxShipCount, this.maxShipLength);
        this.shipArrangement(this.secondPlayer, maxShipCount, this.maxShipLength);
        // const tempPlayer = this.firstPlayer;
        // let count = 1;
        // for(let i = 0; i < (this.boardSize * 2); i++) {
        //     if(i === (this.boardSize - 1)) {
        //         tempPlayer = secondPlayer;
        //         count = 1;
        //     }

            
        // }
    }
}