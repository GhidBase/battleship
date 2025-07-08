export class ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits++;
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

    placeShip(x, y, newShip, direction) {
        this.coords[x][y] = newShip;
    }
}
