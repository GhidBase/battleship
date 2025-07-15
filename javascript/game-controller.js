import { UIController } from "./ui-controller.js";
import { Ship, GameBoard, Player } from "./game-objects.js";

export class GameController {
    constructor() {
        this.uiController = new UIController();
        this.player1Board = this.uiController.player1;
        this.player = new Player("real");
        this.player2 = new Player("computer");

        this.placeShip(1, 0, 0, 3, "vertical");
        this.placeShip(2, 5, 5, 5, "vertical");
    }

    placeShip(player, x, y, length, direction) {
        /*
            Place the ship using logic in game-objects first.
            Only call the UIController to draw the ship if placement is successful.
            This keeps all game logic out of UIController and limits it to rendering only.
        */

        this.uiController.drawShip(player, x, y, length, direction);
    }
}
