export class UIController {
    constructor() {
        this.player1 = document.getElementById("player-1");
        this.player1Cells = [];
        for (let i = 0; i < 10; i++) {
            this.player1Cells.push([]);
        }
        console.log(this.player1Cells);
        this.player2 = document.getElementById("player-2");
        this.player2Cells = [];
        for (let i = 0; i < 10; i++) {
            this.player2Cells.push([]);
        }
        this.player2Cells = [];
        this.player1.innerHTML = "";
        this.player2.innerHTML = "";
        for (let i = 0; i < 100; i++) {
            this.createCell(this.player1);
        }

        for (let i = 0; i < 100; i++) {
            this.createCell(this.player2);
        }
    }

    createCell(board) {
        this.cell = document.createElement("div");
        this.cell.classList.add("cell");
        board.append(this.cell);
    }
}

export class Cell {
    constructor(domElement) {
        this.domElement = domElement;
    }
}
