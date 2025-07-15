import { UIController } from "./ui-controller.js";
import { Ship, GameBoard, Player } from "./game-objects.js";

export class GameController {
    constructor() {
        this.player1Board = new GameBoard();
        this.player2Board = new GameBoard();
        this.uiController = new UIController(this);
        // this.player1Board = this.uiController.player1;
        // this.player2Board = this.uiController.player2;
        this.player = new Player("real");
        this.player2 = new Player("computer");
        this.turn = 1;

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

    player1Action() {
        console.log(`action 1`);
        if (this.turn != 1) {
            return;
        } else if (this.turn == 1) {
        }
    }

    player2Action() {
        console.log(`action 2`);
        if (this.turn != 2) {
            return;
        }
    }
}
