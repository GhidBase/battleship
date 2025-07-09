export class ship {
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

export class gameBoard {
    constructor() {
        this.coords = [];

        for (let i = 0; i < 9; i++) {
            this.coords[i] = [];
        }
    }

    placeShip(x, y, newShip, direction = "horizontal") {
        // horizontal placement
        if (direction == "horizontal") {
            for (let i = x; i < x + newShip.length; i++) {
                this.coords[i][y] = newShip;
            }
        } else if (direction == "vertical") {
            for (let i = y; i < y + newShip.length; i++) {
                this.coords[x][i] = newShip;
            }
        }
    }
}
