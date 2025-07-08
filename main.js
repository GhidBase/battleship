export class ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits++;
        return this.length - this.hits;
    }

    isSunk() {
        return this.hits == this.length;
    }
}
