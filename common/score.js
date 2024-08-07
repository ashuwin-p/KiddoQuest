// score.js
class Score {
    constructor() {
        this.value = 0;
    }

    getScore() {
        return this.value;
    }

    add(points) {
        this.value += points;
    }

    reset() {
        this.value = 0;
    }
}

const score = new Score();
export { score };
