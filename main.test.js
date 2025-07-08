import { ship } from "./main.js";

describe(`ship tests`, () => {
    it(`ship data can be read during testing`, () => {
        let instance = new ship();

        expect(instance.message).toBe("hello");
    });
});
