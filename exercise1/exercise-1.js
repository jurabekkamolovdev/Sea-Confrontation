class Ship {
    constructor(name, length, orientation) {
        this.name = name;
        this.length = length;
        this.orientation = orientation;

        this.hits = new Array(this.length).fill(false);
        this.startPosition = {
            x: 0,
            y: 0
        }
    }

    get shipName() {
        return this.name;
    }

    get shipLength() {
        return this.length
    }

    get shipOrientation() {
        return this.orientation;
    }

    get shipHits() {
        return this.hits;
    }

    get shipStartPosition() {
        return this.startPosition;
    }

    set shipName(name) {
        this.name = name;
    }

    set shipLength(length) {
        this.length = length;
    }

    set shipOrientation(orientation) {
        this.orientation = orientation;
    }

    set shipStartPosition(startPosition) {
        this.startPosition.x = startPosition.x;
        this.startPosition.y = startPosition.y;
    }

    shipHit(position) {
       this.hits[position] = true; 
    }

    shipIsSunk() {
        return this.hits.every(h => h)
    }
}

const shipName = prompt("Ship nomini kiritin:");
const shipLength = Number(prompt("Ship uzunligini kiriting:"));
const shipOrientation = prompt("Ship yo'nalishini kiriting (0 — gorizontal, 1 — vertikal):")

const ship = new Ship(shipName, shipLength, shipOrientation);

console.log(`${ship.shipName}, ${ship.shipLength}, ${ship.shipOrientation}, ${ship.shipIsSunk}`)
