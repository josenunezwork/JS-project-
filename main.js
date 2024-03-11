import { initializeWebGazer } from "./utils/WebGazerUtils.js";
import GameScene from "./scenes/GameScene.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameScene],
};

const game = new Phaser.Game(config);

initializeWebGazer();
