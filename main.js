export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        if (this.hits < this.length) {
            this.hits++;
        }
        return this.length - this.hits;
    }

    isSunk() {
        return this.hits == this.length;
    }
}

export class GameBoard {
    constructor() {
        this.coords = [];
        this.ships = [];

        for (let i = 0; i < 10; i++) {
            this.coords[i] = new Array(10);
        }
    }

    placeShip(x, y, length, direction = "horizontal") {
        if (x < 0 || y < 0) {
            return false;
        }

        let newShip = new Ship(length);
        this.ships.push(newShip);
        // horizontal placement
        if (direction == "horizontal") {
            if (x + newShip.length > 9) {
                return false;
            }

            for (let i = x; i < x + newShip.length; i++) {
                this.coords[i][y] = newShip;
            }
            return true;
        } else if (direction == "vertical") {
            if (y + newShip.length > 9) {
                return false;
            }

            for (let i = y; i < y + newShip.length; i++) {
                this.coords[x][i] = newShip;
            }
            return true;
        }
    }
}
