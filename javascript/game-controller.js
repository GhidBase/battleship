import { UIController } from "./ui-controller.js";
import { Ship, GameBoard, Player } from "./game-objects.js";

export class GameController {
    constructor() {
        this.uiController = new UIController(this);
        this.player1Board = new GameBoard(1, this.uiController);
        this.player2Board = new GameBoard(2, this.uiController);
        // this.player1Board = this.uiController.player1;
        // this.player2Board = this.uiController.player2;
        this.player = new Player("computer", this.player1Board);
        this.player2 = new Player("computer", this.player2Board);
        this.turn;
        this.changeTurn();
        this.gameOver = false;

        /* 
            Place the ships
        */
        this.placeShip(1, 0, 0, 3, "vertical");
        this.placeShip(1, 4, 7, 3, "vertical");
        this.placeShip(1, 8, 3, 2, "horizontal");
        this.placeShip(1, 0, 4, 5);
        this.placeShip(1, 4, 0, 4);
        this.placeShip(1, 4, 0, 4);
        this.placeShip(2, 5, 5, 5, "vertical");
        this.placeShip(2, 1, 1, 4);
        this.placeShip(2, 3, 3, 3);
        this.placeShip(2, 9, 7, 3, "vertical");
        this.placeShip(2, 0, 9, 2);
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
        }
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
        let nextMove = Math.floor(Math.random() * (max));
        
        let x = board.possibleMoves[nextMove][0];
        let y = board.possibleMoves[nextMove][2];
        setTimeout(() => {
            if (player == this.player) {
                this.player1Action(x, y);
            } else {
                this.player2Action(x, y);
            }
        }, 0);
    }
}
