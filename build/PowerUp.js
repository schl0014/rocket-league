import ScoringItem from './ScoringItem.js';
export default class PowerUp extends ScoringItem {
    canvas;
    constructor(imageSrc, xPos, yPos, name, speed, canvas) {
        super(xPos, yPos, speed, name, imageSrc);
        this.canvas = canvas;
    }
    move() {
        this.xPosition += ScoringItem.randomInteger(0, this.speed);
        this.yPosition += ScoringItem.randomInteger(0, this.speed);
    }
    outOfCanvas() {
        if (this.xPosition + this.image.width >= this.canvas.width) {
            this.xPosition = 0;
            this.yPosition = ScoringItem.randomInteger(0, this.canvas.height);
        }
        else if (this.yPosition + this.image.height >= this.canvas.height) {
            this.yPosition = 0;
            this.xPosition = ScoringItem.randomInteger(0, this.canvas.width);
        }
    }
}
//# sourceMappingURL=PowerUp.js.map