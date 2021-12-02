export default class GameItem {
    name;
    xPosition;
    yPosition;
    speed;
    constructor(name) {
        this.name = name;
    }
    getXPosition() {
        return this.xPosition;
    }
    setXPosition(xPosition) {
        this.xPosition = xPosition;
    }
    getYPosition() {
        return this.yPosition;
    }
    setYPosition(yPosition) {
        this.yPosition = yPosition;
    }
    getSpeed() {
        return this.speed;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
}
//# sourceMappingURL=GameItem.js.map