export class Ship {
    constructor(name, length, orientation) {
        this._name = name;
        this._length = length;
        this._orientation = orientation;

        this._hits = new Array(this.length).fill(false);
        this._startPosition = {
            x: 0,
            y: 0
        }
    }

    get name() { return this._name; }
    set name(name) { this._name = name; }

    get length() { return this._length; }
    set length(length) { this._length = length; }

    get orientation() { return this._orientation; }
    set orientation(orientation) { this._orientation = orientation; }

    get hits() { return this._hits; }
    set hits(hits) { this._hits = hits; }

    get startPosition() { return this._startPosition; }
    set startPosition(pos) { this._startPosition = pos; }

    hit(position) {
        this._hits[position] = true;
    }

    isSunk() {
        return this._hits.every( h => h);
    }
}

const input = prompt("Kema malumotlarini kiriting(Kema nomi, uzunligini va {Horizontal - 0 : Vertikal - 1}):");
const [shipName, shipLength, shipOrientation] = input.split(" ");
const ship = new Ship(shipName, Number(shipLength), Number(shipOrientation));

ship.hits[0] = true;
ship.hits[1] = true;

console.log(`"${ship.name}", ${ship.length}, ${ship.orientation}, ${ship.isSunk()}`);
