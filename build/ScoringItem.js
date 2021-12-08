import GameItem from './GameItem.js';
export default class ScoringItem extends GameItem {
    points;
    image;
    constructor(xPos, yPos, speed, name, image) {
        super(xPos, yPos, speed, name);
        this.image = image;
    }
    getXPos() {
        return this.xPosition;
    }
    getYPos() {
        return this.yPosition;
    }
    getimage() {
        return this.image;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.xPosition, this.yPosition);
    }
    static randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=ScoringItem.js.map