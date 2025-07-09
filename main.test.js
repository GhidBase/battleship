import { Ship, GameBoard } from "./main.js";

describe(`ship tests`, () => {
    let targetShip;
    let targetShip2;
    let targetShip3;
    let board;

    beforeEach(() => {
        targetShip = new Ship(2);
        targetShip2 = new Ship(3);
        targetShip3 = new Ship(5);
        board = new GameBoard();
        board.placeShip(5, 4, targetShip, "horizontal");
        board.placeShip(1, 1, targetShip2, "vertical");
        board.placeShip(4, 0, targetShip3, "horizontal");
    });

    it(`board is 10x10 starting from 0`, () => {
        expect(board.coords[0].length).toBe(10);
        expect(board.coords[9].length).toBe(10);
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

    it("Ship placement is horizontal by default", () => {
        expect(board.coords[4][0]).toBe(targetShip3);
        expect(board.coords[5][0]).toBe(targetShip3);
        expect(board.coords[6][0]).toBe(targetShip3);
        expect(board.coords[7][0]).toBe(targetShip3);
        expect(board.coords[8][0]).toBe(targetShip3);
        expect(board.coords[9][0]).toBeFalsy();
    });
});
