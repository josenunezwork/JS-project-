import { getGazePosition } from "../utils/WebGazerUtils.js";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
    // Load background image
    this.load.image("background", "src/assets/images/background.png");

    // Load player sprite
    this.load.spritesheet("player", "src/assets/sprites/player.png", {
        frameWidth: 64,
        frameHeight: 128,
    });

    // Load laser beam sprite/particles
    this.load.spritesheet("laser_beam", "src/assets/sprites/laser_beam.png", {
        frameWidth: 32,
        frameHeight: 32,
    });

    // Load freezing effect sprite/particles
    this.load.spritesheet("freeze_effect", "src/assets/sprites/freeze_effect.png", {
        frameWidth: 64,
        frameHeight: 64,
    });

    // Load sound effects
    this.load.audio("laser_sound", "src/assets/sounds/laser_sound.wav");
    this.load.audio("freeze_sound", "src/assets/sounds/freeze_sound.wav");
}
    

    create() {
        // Create game objects and set up the initial game state
        this.input.on("pointerdown", this.handleClick, this);
        this.input.keyboard.on("keydown-F", this.freezeObject, this);
    }

    handleClick() {
    getGazePosition().then((gazeData) => {
        // Get player position
        const playerX = this.player.x;
        const playerY = this.player.y;

        // Cast laser beam from player's position towards gaze position
        const laserBeam = this.add.particles("laser_beam");
        laserBeam.createEmitter({
            x: playerX,
            y: playerY,
            angle: Phaser.Math.Angle.Between(playerX, playerY, gazeData.x, gazeData.y),
            speed: 600,
            lifespan: 200,
            scale: { start: 0.5, end: 0 },
            blendMode: "ADD",
        });

        // Play laser sound effect
        this.sound.play("laser_sound");
    }).catch((error) => {
        console.error(error);
    });
}

    freezeObject() {
    getGazePosition().then((gazeData) => {
        // Apply freezing effect to the object at the gaze position
        const freezeEffect = this.add.particles("freeze_effect");
        freezeEffect.createEmitter({
            x: gazeData.x,
            y: gazeData.y,
            speed: 100,
            lifespan: 1000,
            scale: { start: 0.5, end: 1 },
            blendMode: "ADD",
        });

        // Play freeze sound effect
        this.sound.play("freeze_sound");
    }).catch((error) => {
        console.error(error);
    });
}

    update() {
      // TODO
        // Update game state and handle game logic
    }
}

export default GameScene;
