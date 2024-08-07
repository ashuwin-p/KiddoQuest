// game1.js
import { score } from '../common/score.js';
import { Congratulations } from '../common/congrats.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

let correctSound;
let incorrectSound;
let wasteItems;
let itemsPlaced = 0;
const totalItems = 2; // Update this based on the total number of items

const binPositions = {
    bio: { x: window.innerWidth * 0.75, y: window.innerHeight - 100 },
    nonBio: { x: window.innerWidth * 0.25, y: window.innerHeight - 100 }
};

const wasteStartPositions = [
    { key: 'bananaPeel', x: 100, y: 100, scale: 0.15 },
    { key: 'plasticBottle', x: 200, y: 100, scale: 0.15 }
];

function preload() {
    this.load.image('bioBin', '../assets/game-1/bioBin.png');
    this.load.image('nonBioBin', '../assets/game-1/nonBioBin.png');
    this.load.image('bananaPeel', '../assets/game-1/bananaPeel.png');
    this.load.image('plasticBottle', '../assets/game-1/plasticBottle.png');
    this.load.image('star', '../assets/common/star.png');
    this.load.audio('correct', '../assets/common/correct.mp3');
    this.load.audio('incorrect', '../assets/common/incorrect.mp3');
    this.load.audio('cheer', '../assets/common/cheer.mp3');
    this.load.image('wasteBackground', '../assets/game-1/background.svg');
    console.log("Preloaded Assets ");
}

function create() {
    // Add level-specific background
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    this.add.image(screenWidth / 2, screenHeight / 2, 'wasteBackground').setScale(1.5).setDepth(0);

    // Add bins
    const binScale = 0.3;
    this.add.image(binPositions.bio.x, binPositions.bio.y, 'bioBin').setScale(binScale);
    this.add.image(binPositions.nonBio.x, binPositions.nonBio.y, 'nonBioBin').setScale(binScale);

    // Add waste items
    wasteItems = this.physics.add.group();
    wasteStartPositions.forEach((pos) => {
        let item = wasteItems.create(pos.x, pos.y, pos.key).setInteractive().setScale(pos.scale);
        item.startX = pos.x;
        item.startY = pos.y;
    });

    this.input.setDraggable(wasteItems.getChildren());

    // Load sounds
    correctSound = this.sound.add('correct');
    incorrectSound = this.sound.add('incorrect');

    // Score text
    const scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject) => {
        if (isInBin(gameObject, binPositions.bio) && gameObject.texture.key === 'bananaPeel') {
            correctSound.play();
            score.add(10); // Update score
            gameObject.destroy(); // Remove the item on correct placement
            itemsPlaced++;
            console.log("Correct Answer");
        } else if (isInBin(gameObject, binPositions.nonBio) && gameObject.texture.key === 'plasticBottle') {
            correctSound.play();
            score.add(10); // Update score
            gameObject.destroy(); // Remove the item on correct placement
            itemsPlaced++;
            console.log("Correct Answer");
        } else {
            incorrectSound.play();
            gameObject.x = gameObject.startX;
            gameObject.y = gameObject.startY;
            console.log("Incorrect Answer");
        }
        scoreText.setText('Score: ' + score.getScore()); // Update score text
        console.log(itemsPlaced);
        console.log(totalItems);
        if (itemsPlaced >= totalItems) {
            console.log("Preparing to end the game...");

            // Add a delay before calling endGame
            setTimeout(() => {
                endGame.call(this); // Call endGame after the delay
                console.log("Game Ends ...");
            }, 2000); // Delay in milliseconds (2000ms = 2 seconds)
        }
    });

    this.scale.on('resize', resize, this);
}

function update() { }

function isInBin(gameObject, binPosition) {
    return (
        gameObject.x > binPosition.x - 50 &&
        gameObject.x < binPosition.x + 50 &&
        gameObject.y > binPosition.y - 50 &&
        gameObject.y < binPosition.y + 50
    );
}

function resize(gameSize, baseSize, displaySize, resolution) {
    let width = gameSize.width;
    let height = gameSize.height;

    this.cameras.resize(width, height);

    binPositions.bio = { x: width * 0.75, y: height - 100 };
    binPositions.nonBio = { x: width * 0.25, y: height - 100 };

    this.add.image(binPositions.bio.x, binPositions.bio.y, 'bioBin').setScale(0.3);
    this.add.image(binPositions.nonBio.x, binPositions.nonBio.y, 'nonBioBin').setScale(0.3);
}

function endGame() {
    const congrats = new Congratulations(this);
    congrats.show();
}
