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
    constructor(playerNum, uiController) {
        this.uiController = uiController;
        this.coords = [];
        this.ships = [];
        this.attacksReceived = [];
        this.possibleMoves = [];
        this.playerNum = playerNum;

        for (let i = 0; i < 10; i++) {
            this.coords[i] = new Array(10);
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this.possibleMoves.push(`${i},${j}`);
            }
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
        try {
            if (outOfBounds) {
                throw new Error(`Cannot place ship: (${outOfBounds})`);
            }
        } catch (error) {
            console.error(error.message);
            return false;
        }

        let occupied = this.spacesOccupiedByShip(x, y, length, direction);
        try {
            if (occupied) {
                throw new Error(
                    `Cannot place ship: space already occupied (${occupied})`
                );
            }
        } catch (error) {
            console.error(error.message);
            return false;
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
        // console.log(this.attacksReceived);
        if (this.attacksReceived.includes(`${x},${y}`)) {
            return "stale move";
        }
        
        let target = this.coords[x][y];

        // I only test for a truthy value because
        // the only truthy value stored on the board
        // other than the ones in "attackReceived"
        // are ships.

        this.attacksReceived.push(`${x},${y}`);
        this.possibleMoves = this.possibleMoves.filter(
            (element) => element != `${x},${y}`
        );

        if (target) {
            target.hit();
            this.uiController.drawHit(this.playerNum, x, y);
            if (target.isSunk()) {
                return "sunk";
            }
            return "hit";
        } else {
            this.uiController.drawMiss(this.playerNum, x, y);
            return "miss";
        }
    }

    allShipsSunk() {
        return this.ships.every((currentShip) => {
            return currentShip.isSunk();
        });
    }
}

export class Player {
    constructor(type, board) {
        this.board = board;
        this.type = type; // real or computer
        this.searching = [];
        if (type != "real" && type != "computer") {
            throw new Error(
                'player objects must be of type "real" or "computer"'
            );
        }
        this.enemyData = new Map;
    }
}
