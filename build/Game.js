import Player from './Player.js';
import PowerUp from './PowerUp.js';
import Rocket from './Rocket.js';
import ScoringItem from './ScoringItem.js';
export default class Game {
    rockets;
    player;
    canvas;
    score;
    ctx;
    powerup;
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.rockets = [];
        for (let index = 0; index < 10; index++) {
            if (index % 2 === 0) {
                this.rockets.push(new Rocket(ScoringItem.loadNewImage('./assets/rocket-horizontal.png'), 0, ScoringItem.randomInteger(0, this.canvas.height - 200), 'leftToRight', 1, this.canvas));
                console.log('leftToRight');
            }
            else {
                this.rockets.push(new Rocket(ScoringItem.loadNewImage('/assets/rocket-vertical.png'), ScoringItem.randomInteger(0, this.canvas.width - 200), 0, 'high to low', 1, this.canvas));
            }
        }
        console.log(this.rockets);
        this.player = new Player(this.canvas, 'Niek', 15);
        this.powerup = new PowerUp(ScoringItem.loadNewImage('./assets/face_on_plus_health.png'), 0, ScoringItem.randomInteger(0, this.canvas.height - 200), 'leftToRightHeal', 4, this.canvas);
        console.log(this.powerup);
        console.log(this.player);
        this.score = 0;
        this.loop();
    }
    loop = () => {
        this.score += 1;
        this.draw();
        this.powerup.draw(this.ctx);
        this.powerup.move();
        this.powerup.outOfCanvas();
        for (let i = 0; i < this.rockets.length; i++) {
            this.rockets[i].move(this.rockets);
            this.rockets[i].outOfCanvas();
        }
        this.player.collidesWithRocket(this.rockets);
        this.player.collidesWithPowerup(this.powerup);
        this.player.move();
        requestAnimationFrame(this.loop);
    };
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        if (this.rockets.length !== 0) {
            for (let i = 0; i < this.rockets.length; i++) {
                this.rockets[i].draw(this.ctx);
            }
            this.writeTextToCanvas(`Score is: ${this.score}`, this.canvas.width / 10, this.canvas.height / 10, 40);
        }
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Game.js.map