// import { GameController } from "./game-controller.js";

export class UIController {
    constructor(gameController) {
        this.gameController = gameController;
        this.currentMessage2;

        this.player1 = document.getElementById("player-1");
        this.player1Cells = [];
        this.player2 = document.getElementById("player-2");
        this.player2Cells = [];

        // Clear cells
        this.player1.innerHTML = "";
        this.player2.innerHTML = "";

        // Populate the boards with cells
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

        this.messagePanel = document
            .getElementById("message-panel")
            .querySelector("p");
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

    drawHit(board, x, y) {
        let playerCells = board == 1 ? this.player1Cells : this.player2Cells;
        playerCells[x][y].classList.add("hit");
        playerCells[x][y].classList.add("ship");
    }
    drawMiss(board, x, y) {
        let playerCells = board == 1 ? this.player1Cells : this.player2Cells;
        playerCells[x][y].classList.add("miss");
    }

    drawMessage(message) {
        this.messagePanel.textContent = message;
    }

    draw2Messages(message1, message2) {
        this.currentMessage2 = message2;

        this.messagePanel.textContent = message1;
        setTimeout(() => {
            /*
                I check if the currentMessage2 is still the 
                same as it was when this was queued up. If the
                currentMessage2 is different by the time the timer
                is up, that means another message is already loaded,
                and we should wait for that one instead
            */
            if (this.currentMessage2 == message2) {
                this.drawMessage(message2);
            }
        }, 1000);
    }

    drawMessageUsingAttackResultAndTurn(result, turn) {
        let message1;
        switch (result) {
            case "hit":
                message1 = "Hit!";
                break;
            case "miss":
                message1 = "Miss";
                break;
            case "wrong turn":
                message1 = "Other player's turn";
                break;
            case "stale move":
                message1 = "Invalid move";
                break;
            case "p1 win":
                message1 = "Player 1 wins!";
                break;
            case "sunk":
                message1 = "Ship sunk!"
        }
        let message2 = turn == 1 ? "Player 2's turn" : "Player 1's turn";
        if (result == "wrong turn") {
            message2 = turn == 2 ? "Player 2's turn" : "Player 1's turn";
        }
        if (message1 == "Player 1 wins!" || message1 == "Player 2 wins!") {
            message2 = message1;
        }
        this.draw2Messages(message1, message2);
    }
}

export class Cell {
    constructor(domElement) {
        this.domElement = domElement;
    }
}
