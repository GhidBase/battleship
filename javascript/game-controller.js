import { UIController } from "./ui-controller.js";
import { Ship, GameBoard, Player } from "./game-objects.js";

export class GameController {
    constructor() {
        this.uiController = new UIController();
        this.player = new Player("real");
        this.player2 = new Player("computer");
    }
}
