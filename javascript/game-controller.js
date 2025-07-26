import { UIController } from "./ui-controller.js";
import { Ship, GameBoard, Player } from "./game-objects.js";

export class GameController {
    constructor() {
        this.newGame();
    }

    newGame() {
        console.clear();
        this.uiController = new UIController(this);
        this.player1Board = new GameBoard(1, this.uiController);
        this.player2Board = new GameBoard(2, this.uiController);

        // types are real and computer
        this.player = new Player("computer", this.player1Board);
        this.player2 = new Player("computer", this.player2Board);
        this.turn = null;
        this.changeTurn();
        this.gameOver = false;
        this.uiController.drawStartGameMessage();

        this.randomizeShips();
    }

    randomizeShips() {
        this.randomizeShip(2, 5);
        this.randomizeShip(2, 4);
        this.randomizeShip(2, 3);
        this.randomizeShip(2, 3);
        this.randomizeShip(2, 2);

        this.randomizeShip(1, 5);
        this.randomizeShip(1, 4);
        this.randomizeShip(1, 3);
        this.randomizeShip(1, 3);
        this.randomizeShip(1, 2);
    }

    placeShip(player, x, y, length, direction) {
        /*
            Place the ship using logic in game-objects first.
            Only call the UIController to draw the ship if placement is successful.
            This keeps all game logic out of UIController and limits it to rendering only.
        */
        let board = player == 1 ? this.player1Board : this.player2Board;

        let placeShip = board.placeShip(x, y, length, direction);
        if (placeShip) {
            this.uiController.drawShip(player, x, y, length, direction);
            return true;
        }
    }

    randomizeShip(board, length) {
        let settings = this.randomSettings();
        let result;
        while (!result) {
            settings = this.randomSettings();
            result = this.placeShip(
                board,
                settings.x,
                settings.y,
                length,
                settings.orientation
            );
        }
    }

    randomSettings() {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let orientation = Math.floor(Math.random() * 2 + 1);
        orientation = orientation == 1 ? "horizontal" : "vertical";
        return { x, y, orientation };
    }

    player1Action(x, y, isAI) {
        if (this.gameOver) {
            return;
        }

        if (this.turn != 1) {
            return;
        }

        if (!isAI && this.player.type == "computer") {
            console.log(!isAI && this.player.type == "computer");
            return;
        }

        let attackResult;
        if (this.turn != 1) {
            attackResult = "wrong turn";
        } else {
            attackResult = this.player2Board.receiveAttack(x, y);
        }

        if (this.player2Board.allShipsSunk()) {
            attackResult = "p1 win";
        }

        this.uiController.drawMessageUsingAttackResultAndTurn(
            attackResult,
            this.turn
        );

        if (this.player2Board.allShipsSunk()) {
            this.gameOver = true;
        }

        if (attackResult != "stale move" && attackResult != "wrong turn") {
            console.log("good move");
            this.changeTurn();
        } else {
            let player = this.turn == 1 ? this.player : this.player2;
            if (player.type == "computer") {
                this.aiMove();
            }
        }

        return attackResult;

        // console.log(attackResult);
    }

    player2Action(x, y, isAI) {
        if (this.gameOver) {
            return;
        }

        if (this.turn != 2) {
            return;
        }

        if (!isAI && this.player2.type == "computer") {
            return;
        }

        let attackResult;
        if (this.turn != 2) {
            attackResult = "wrong turn";
        } else {
            attackResult = this.player1Board.receiveAttack(x, y);
        }

        if (this.player1Board.allShipsSunk()) {
            attackResult = "p2 win";
        }

        this.uiController.drawMessageUsingAttackResultAndTurn(
            attackResult,
            this.turn
        );

        if (this.player1Board.allShipsSunk()) {
            this.gameOver = true;
        }

        if (attackResult != "stale move" && attackResult != "wrong turn") {
            console.log("good move");
            this.changeTurn();
        } else {
            let player = this.turn == 1 ? this.player : this.player2;
            if (player.type == "computer") {
                this.aiMove();
            }
        }

        return attackResult;

        // console.log(attackResult);
    }

    changeTurn() {
        if (this.turn) {
            this.turn = this.turn == 1 ? 2 : 1;
        } else {
            this.turn = 1;
        }
        let player = this.turn == 1 ? this.player : this.player2;
        if (player.type == "computer") {
            this.aiMove();
        }
    }

    isValidCoords(coords) {
        let coordsSplit = coords.split(",");
        let x = coordsSplit[0];
        let y = coordsSplit[1];

        if (x > 9 || x < 0) {
            return false;
        }

        if (y > 9 || y < 0) {
            return false;
        }

        return true;
    }

    aiMove() {
        let player = this.turn == 1 ? this.player : this.player2;

        if (player.searching.length > 0) {
            // use a saved coord
            let board = this.turn == 2 ? this.player1Board : this.player2Board;
            let max = player.searching.length;
            let nextMove = Math.floor(Math.random() * max);

            let coords = player.searching[nextMove].split(",");
            let x = coords[0];
            let y = coords[1];
            player.searching.splice(nextMove, 1);
            // console.log("hunting move");
            let result;
            setTimeout(() => {
                if (player == this.player) {
                    result = this.player1Action(x, y, true);
                } else {
                    result = this.player2Action(x, y, true);
                }
            }, 1000); // normally is 2750

            if (result == "hit") {
                // check existing player.searchings
                // store a list of coords for each ship found
            }
        } else {
            // use a random coord
            // if the random coord land store the adjacent panels
            // that aren't yet in possible moves
            let board = this.turn == 2 ? this.player1Board : this.player2Board;
            let max = board.possibleMoves.length;
            let nextMove = Math.floor(Math.random() * max);

            // 0 and 2 because we call a string that looks like 0,0
            let x = board.possibleMoves[nextMove][0];
            let y = board.possibleMoves[nextMove][2];

            setTimeout(() => {
                let result;
                if (player == this.player) {
                    result = this.player1Action(x, y, true);
                    console.log(result);
                } else {
                    result = this.player2Action(x, y, true);
                }

                if (result != "hit") {
                    return;
                }

                console.log("hit");

                let locatedTarget = board.coords[x][y];
                player.enemyData.set(locatedTarget, { x: x, y: y });

                // check to see if the adjacent panels are possible
                let xplus = Number(x) + 1 + "," + y;
                let xminus = Number(x) - 1 + "," + y;
                let yminus = x + "," + Number(y - 1);
                let yplus = x + "," + (Number(y) + 1);

                if (this.isValidCoords(xplus)) {
                    player.searching.push(xplus);
                }

                if (this.isValidCoords(xminus)) {
                    player.searching.push(xminus);
                }

                if (this.isValidCoords(yplus)) {
                    player.searching.push(yplus);
                }

                if (this.isValidCoords(yminus)) {
                    player.searching.push(yminus);
                }
            }, 1000); // normally is 2750
        }
    }
}
