import Phaser from "phaser";
import { GameScene } from "./GameScene";

export default class Game {
    constructor() {
        this.config = {
            type: Phaser.AUTO,
            width: 640, 
            height: 360,
            scene: new GameScene()
        };

        this.game = null;
    }

    render() {
        this.game = new Phaser.Game(this.config);
    }

    exit() {
        this.game = null;
    }
}