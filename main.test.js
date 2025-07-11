import { Ship, GameBoard, Player } from "./game-objects.js";

describe(`board tests`, () => {
    let board;
    beforeEach(() => {
        board = new GameBoard();
    });

    it(`board is 10x10 starting from 0`, () => {
        expect(board.coords[0].length).toBe(10);
        expect(board.coords[9].length).toBe(10);
    });
});

describe(`ship hit functions`, () => {
    let board;
    let targetShip;

    beforeEach(() => {
        board = new GameBoard();
        targetShip = new Ship(2);
    });

    it(`hit() causes damage and returns remaining health`, () => {
        expect(targetShip.hit()).toBe(1);
    });

    it(`hit() with one health causes ship to be sunk`, () => {
        targetShip.hit();
        targetShip.hit();
        expect(targetShip.isSunk()).toBe(true);
    });

    it(`hit() won't log a hit if ship hits == length`, () => {
        targetShip.hit();
        targetShip.hit();
        targetShip.hit();
        expect(targetShip.hits).toBe(2);
    });
});

describe(`ship placement`, () => {
    let board;

    beforeEach(() => {
        board = new GameBoard();
        board.placeShip(5, 4, 2, "horizontal");
        board.placeShip(1, 1, 3, "vertical");
    });

    it("Ship placement works", () => {
        board = new GameBoard();
        expect(board.placeShip(5, 4, 2, "horizontal")).toBe(true);
        expect(board.coords[6][4]).toBeTruthy();
        expect(board.coords[6][4]).toBeTruthy();
        expect(board.coords[7][4]).toBeUndefined();
    });

    it("Horizontal ship placement works", () => {
        expect(board.coords[6][4]).toBe(board.ships[0]);
    });

    it("Ship doesn't exceed set length", () => {
        expect(board.coords[7][4]).toBeFalsy();
    });

    it("Vertical ship placement works", () => {
        expect(board.coords[1][1]).toBe(board.ships[1]);
        expect(board.coords[1][2]).toBe(board.ships[1]);
        expect(board.coords[1][3]).toBe(board.ships[1]);
        expect(board.coords[1][4]).toBeFalsy();
    });

    it("Ship placement is horizontal by default", () => {
        expect(board.placeShip(4, 0, 5)).toBeTruthy();
        expect(board.coords[4][0]).toBe(board.ships[2]);
        expect(board.coords[5][0]).toBe(board.ships[2]);
        expect(board.coords[6][0]).toBe(board.ships[2]);
        expect(board.coords[7][0]).toBe(board.ships[2]);
        expect(board.coords[8][0]).toBe(board.ships[2]);
        expect(board.coords[9][0]).toBeFalsy();
    });

    it("Ship placement can't go beyond the bounds of the board", () => {
        expect(() => board.placeShip(7, 5, 7)).toThrow();
        expect(board.placeShip(8, 5, 2)).toBe(true);
        expect(() => board.placeShip(-1, 0, 3)).toThrow();
    });

    it("Ships can't be placed on other ships", () => {
        expect(board.placeShip(7, 7, 1)).toBeTruthy();
        expect(() => board.placeShip(7, 7, 1)).toThrow(
            `Cannot place ship: space already occupied 7,7`
        );
    });
});

describe(`hit detection`, () => {
    let board;
    beforeEach(() => {
        board = new GameBoard();
        board.placeShip(4, 4, 2); // x = 4, y = 4, goes to x = 5, y = 4
    });

    it("landed attack registers", () => {
        expect(board.receiveAttack(4, 4)).toBe("hit");
    });

    it("missed attack registers", () => {
        expect(board.receiveAttack(3, 4)).toBe("miss");
    });

    it("can't target a cell that was already attacked", () => {
        expect(board.receiveAttack(4, 4)).toBe("hit");
        expect(board.receiveAttack(4, 4)).toBe("stale move");

        expect(board.receiveAttack(3, 4)).toBe("miss");
        expect(board.receiveAttack(3, 4)).toBe("stale move");
    });

    it("hits register damage on ships", () => {
        let originalHits = board.ships[0].hits;
        board.receiveAttack(4, 4);
        expect(board.ships[0].hits).toBe(++originalHits);
    });
});

describe("sunk ship detection", () => {
    let board;
    beforeEach(() => {
        board = new GameBoard();
        board.placeShip(2, 2, 2);
        board.placeShip(5, 5, 3);
    });
    it("all ships sunk", () => {
        board.receiveAttack(2, 2);
        board.receiveAttack(3, 2);
        board.receiveAttack(5, 5);
        board.receiveAttack(6, 5);
        board.receiveAttack(7, 5);
        expect(board.allShipsSunk()).toBe(true);
    });

    it("only the first ship sunk", () => {
        board.receiveAttack(2, 2);
        board.receiveAttack(3, 2);
        expect(board.allShipsSunk()).toBe(false);
        expect(board.ships[0].isSunk()).toBe(true);
    });
});

describe("player tests", () => {
    it('player objects can only be "real" or "computer"', () => {
        expect(() => {
            new Player("human");
        }).toThrow();

        expect(() => {
            new Player("real");
        }).not.toThrow();

        expect(() => {
            new Player("computer");
        }).not.toThrow();
    });
});
