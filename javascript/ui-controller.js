// import { GameController } from "./game-controller.js";

export class UIController {
    constructor(gameController) {
        this.gameController = gameController;
        this.player1 = document.getElementById("player-1");
        this.player1Cells = [];
        console.log(this.player1Cells);
        this.player2 = document.getElementById("player-2");
        this.player2Cells = [];
        for (let i = 0; i < 10; i++) {
            this.player2Cells.push([]);
        }
        this.player2Cells = [];
        this.player1.innerHTML = "";
        this.player2.innerHTML = "";

        for (let i = 0; i < 10; i++) {
            this.player1Cells.push([]);
            for (let j = 0; j < 10; j++) {
                this.player1Cells[i].push(this.createCell(this.player1, i, j));
            }
        }

        for (let i = 0; i < 10; i++) {
            this.player2Cells.push([]);
            for (let j = 0; j < 10; j++) {
                this.player2Cells[i].push(this.createCell(this.player2, i, j));
            }
        }
    }

    createCell(board, x, y) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        board.append(cell);
        cell.addEventListener("click", () => {
            if (board == this.player1) {
                this.gameController.player2Action(x, y);
            } else if (board == this.player2) {
                this.gameController.player1Action(x, y);
            }
        });
        return cell;
    }

    drawShip(board, x, y, length, direction = "horizontal") {
        if (board == 1) {
            for (let i = 0; i < length; i++) {
                if (direction == "horizontal") {
                    this.player1Cells[x + i][y].classList.add("ship");
                } else if (direction == "vertical") {
                    this.player1Cells[x][y + i].classList.add("ship");
                }
            }
            return true;
        }

        if (board == 2) {
            for (let i = 0; i < length; i++) {
                if (direction == "horizontal") {
                    this.player2Cells[x + i][y].classList.add("ship");
                } else if (direction == "vertical") {
                    this.player2Cells[x][y + i].classList.add("ship");
                }
            }
            return true;
        }
    }

    drawAttack(board, x, y) {
        let playerCells = board == 1 ? this.player1Cells : this.player2Cells;
        if (playerCells[x][y].classList.contains("ship")) {
            playerCells[x][y].classList.add("hit");
        } else {
            playerCells[x][y].classList.add("miss");
        }
    }
}

export class Cell {
    constructor(domElement) {
        this.domElement = domElement;
    }
}
