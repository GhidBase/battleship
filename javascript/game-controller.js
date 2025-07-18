import { UIController } from "./ui-controller.js";
import { Ship, GameBoard, Player } from "./game-objects.js";

export class GameController {
    constructor() {
        this.uiController = new UIController(this);
        this.player1Board = new GameBoard(1, this.uiController);
        this.player2Board = new GameBoard(2, this.uiController);

        // types are real and computer
        this.player = new Player("real", this.player1Board);
        this.player2 = new Player("computer", this.player2Board);
        this.turn;
        this.changeTurn();
        this.gameOver = false;

        /* 
            Place the ships
        */
        // this.placeShip(1, 0, 0, 3, "vertical");
        // this.placeShip(1, 4, 7, 3, "vertical");
        // this.placeShip(1, 8, 3, 2, "horizontal");
        // this.placeShip(1, 0, 4, 5);
        // this.placeShip(1, 4, 0, 4);
        // this.placeShip(1, 4, 0, 4);
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

    player1Action(x, y) {
        if (this.gameOver) {
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
            this.changeTurn();
        } else {
            let player = this.turn == 1 ? this.player : this.player2;
            if (player.type == "computer") {
                this.aiMove();
            }
        }
    }

    player2Action(x, y) {
        if (this.gameOver) {
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
            this.changeTurn();
        } else {
            let player = this.turn == 1 ? this.player : this.player2;
            if (player.type == "computer") {
                this.aiMove();
            }
        }
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

    aiMove() {
        let player = this.turn == 1 ? this.player : this.player2;
        let board = this.turn == 2 ? this.player1Board : this.player2Board;
        let max = board.possibleMoves.length;
        let nextMove = Math.floor(Math.random() * max);

        let x = board.possibleMoves[nextMove][0];
        let y = board.possibleMoves[nextMove][2];
        setTimeout(() => {
            if (player == this.player) {
                this.player1Action(x, y);
            } else {
                this.player2Action(x, y);
            }
        }, 2750);
    }
}
