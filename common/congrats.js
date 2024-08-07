import { score } from './score.js';

class Congratulations {
    constructor(scene) {
        this.scene = scene;
        this.cheerSound = this.scene.sound.add('cheer','../../assets/common/cheer.mp3'); 
    }

    show() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Show background
        const bg = this.scene.add.rectangle(screenWidth / 2, screenHeight / 2, screenWidth, screenHeight, 0xffffff, 0.5).setDepth(10);

        // Show text
        const congratsText = this.scene.add.text(screenWidth / 2, screenHeight / 2 - 100, 'Congratulations!', { fontSize: '48px', fill: '#000' })
            .setDepth(11)
            .setOrigin(0.5);

        const scoreText = this.scene.add.text(screenWidth / 2, screenHeight / 2 - 40, `Score: ${score.getScore()}`, { fontSize: '32px', fill: '#000' })
            .setDepth(11)
            .setOrigin(0.5);

        // Show stars with animation
        const star1 = this.scene.add.image(screenWidth / 2 - 200, screenHeight / 2 + 100, 'star').setScale(0.1).setAlpha(0).setDepth(11);
        const star2 = this.scene.add.image(screenWidth / 2, screenHeight / 2 + 100, 'star').setScale(0.1).setAlpha(0).setDepth(11);
        const star3 = this.scene.add.image(screenWidth / 2 + 200, screenHeight / 2 + 100, 'star').setScale(0.1).setAlpha(0).setDepth(11);

        this.scene.tweens.add({
            targets: [star1, star2, star3],
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            delay: this.scene.tweens.stagger(500),
        });

        // Play cheer sound
        if (this.cheerSound) {
            this.cheerSound.play();
        }
    }
}

export { Congratulations };
