class Preloader extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloader' });
    }

    preload ()
    {
        let progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0x73c494, 1);
            progress.fillRect(0, (this.sys.game.config.height / 2) - 30, this.sys.game.config.width * value, 60);
        });
        this.load.on('complete', () => {
            progress.destroy();
        });

        // Load assets here
        this.load.image('tiles', 'assets/tiles.png');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('badguy', 'assets/badguy.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('greenbar', 'assets/greenbar.png');
        this.load.image('redbar', 'assets/redbar.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('gamepaused', 'assets/gamepaused.png');
    }

    create ()
    {
        this.scene.start(this.startPosition.startScene);
    }

}

export default Preloader;
