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
        this.attacksReceived = [];

        for (let i = 0; i < 10; i++) {
            this.coords[i] = new Array(10);
        }
    }

    coordsOutOfBounds(x, y, length, direction) {
        if (x < 0 || y < 0) {
            return true;
        }

        if (direction == "horizontal") {
            if (x + length - 1 > 9) {
                return `out of bounds, largest x coord is ${x + length - 1}`;
            }
        }

        if (direction == "vertical") {
            if (y + length - 1 > 9) {
                return `out of bounds, largest y coord is ${y + length - 1}`;
            }
        }

        return false;
    }

    spacesOccupiedByShip(x, y, length, direction) {
        if (direction == "horizontal") {
            for (let i = x; i < x + length; i++) {
                if (
                    this.coords[i][y] &&
                    this.ships.includes(this.coords[i][y])
                ) {
                    return [i, y];
                }
            }
            return false;
        } else if (direction == "vertical") {
            for (let i = y; i < y + length; i++) {
                if (
                    this.coords[x][i] &&
                    this.ships.includes(this.coords[x][i])
                ) {
                    return [x, i];
                }
            }
            return false;
        }
    }

    placeShip(x, y, length, direction = "horizontal") {
        let outOfBounds = this.coordsOutOfBounds(x, y, length, direction);
        if (outOfBounds) {
            throw new Error(`Cannot place ship: ${outOfBounds}`);
        }

        let occupied = this.spacesOccupiedByShip(x, y, length, direction);
        if (occupied) {
            throw new Error(
                `Cannot place ship: space already occupied ${occupied}`
            );
        }

        let newShip = new Ship(length);
        this.ships.push(newShip);
        // horizontal placement
        if (direction == "horizontal") {
            for (let i = x; i < x + newShip.length; i++) {
                this.coords[i][y] = newShip;
            }
            return true;
        }

        if (direction == "vertical") {
            for (let i = y; i < y + newShip.length; i++) {
                this.coords[x][i] = newShip;
            }
            return true;
        }
    }

    receiveAttack(x, y) {
        if (this.attacksReceived.includes(`${x},${y}`)) {
            return "stale move";
        }

        let target = this.coords[x][y];

        // I only test for a truthy value because
        // the only truthy value stored on the board
        // other than the ones in "attackReceived"
        // are ships.

        this.attacksReceived.push(`${x},${y}`);
        if (target) {
            target.hit();
            return "hit";
        } else {
            return "miss";
        }
    }

    allShipsSunk() {
        return this.ships.every((currentShip) => {
            return currentShip.isSunk();
        });
    }
}
