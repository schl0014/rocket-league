import GameItem from './GameItem.js';
export default class ScoringItem extends GameItem {
    points;
    image;
    constructor(name, points) {
        super(name);
        this.points = points;
    }
    getPoints() {
        return this.points;
    }
    getImage() {
        return this.image;
    }
    setImage(image) {
        this.image = image;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.getXPosition(), this.getYPosition());
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=ScoringItem.js.map