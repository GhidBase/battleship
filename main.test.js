import { ship, gameBoard } from "./main.js";

describe(`ship tests`, () => {
    let targetShip;
    let targetShip2;
    let board;

    beforeEach(() => {
        targetShip = new ship(2);
        targetShip2 = new ship(3);
        board = new gameBoard();
        board.placeShip(5, 4, targetShip, "horizontal");
        board.placeShip(1, 1, targetShip2, "vertical");
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

    it("Ship placement works", () => {
        expect(board.coords[5][4]).toBe(targetShip);
    });

    it("Horizontal ship placement works", () => {
        expect(board.coords[6][4]).toBe(targetShip);
    });

    it("Ship doesn't exceed set length", () => {
        expect(board.coords[7][4]).toBeFalsy();
    });

    it("Vertical ship placement works", () => {
        expect(board.coords[1][1]).toBe(targetShip2);
        expect(board.coords[1][2]).toBe(targetShip2);
        expect(board.coords[1][3]).toBe(targetShip2);
        expect(board.coords[1][4]).toBeFalsy();
    });
});
