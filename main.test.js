import { Ship, GameBoard } from "./main.js";

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

describe(`ship placement tests`, () => {
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
