import { ship } from "./main.js";

describe(`ship tests`, () => {
    let targetShip;

    beforeEach(() => {
        targetShip = new ship(2);
    });

    it(`hit() causes damage and returns remaining health`, () => {
        expect(targetShip.hit()).toBe(1);
    });

    it(`hit() with one health causes ship to be sunk`, () => {
        targetShip.hit();
        targetShip.hit();
        expect(targetShip.isSunk()).toBe(true);
    });
});
