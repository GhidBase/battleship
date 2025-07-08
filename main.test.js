import { ship, gameBoard } from "./main.js";

describe(`ship tests`, () => {
    let targetShip;
    let board;

    beforeEach(() => {
        targetShip = new ship(2);
        board = new gameBoard();
        board.placeShip(5, 4, targetShip, "horizontal");
    });

    it(`hit() causes damage and returns remaining health`, () => {
        expect(targetShip.hit()).toBe(1);
    });

    it(`hit() with one health causes ship to be sunk`, () => {
        targetShip.hit();
        targetShip.hit();
        expect(targetShip.isSunk()).toBe(true);
    });

    it("Ship placement works", () => {
        expect(board.coords[5][4]).toBe(targetShip);
    });
});
