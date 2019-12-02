import 'phaser';
import Player from '../sprites/Player.js';
import Badguy from '../sprites/Badguy.js';

class Level extends Phaser.Scene {

    constructor (config)
    {
        super((config) ? config : { key: 'level' });
        this.gamepaused = undefined;

        this.player = undefined;
        this.badguy = undefined;
        this.exits = undefined;

        this.backgroundBar;
        this.healthBar;
        this.healthLabel;

        this.scoreVariable = 0;
        this.scoreLabel;
        this.gameover;
    }

    create()
    {
        this.cameras.main.setRoundPixels(true);
        
        // start controls
        this.controls.start();

        this.exits = [];
        this.cameras.main.setBackgroundColor('#00FF00');
    }

    postCreate()
    {
        this.gamepaused = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'gamepaused');
        this.gamepaused.visible = false;
        this.gamepaused.setScrollFactor(0);
        this.gamepaused.setDepth(3);

        this.gameover = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'gameover');
        this.gameover.visible = false;
        this.gameover.setScrollFactor(0);
        this.gameover.setDepth(3);

        //console.log(this);
        this.resizeField(this.sys.game.config.width, this.sys.game.config.height);
        this.cameras.main.flash(3000, fadeColor.r, fadeColor.g, fadeColor.b);
    }

    addStatusBar(){
        this.backgroundBar = this.add.image(100, 20, 'redbar');
        this.backgroundBar.fixedToCamera = true;
        this.backgroundBar.visible = true;
        this.backgroundBar.setScrollFactor(0);
        this.backgroundBar.setDepth(1);

        this.healthBar = this.add.image(100, 20, 'greenbar');
        this.healthBar.fixedToCamera = true;
        this.healthBar.visible = true;
        this.healthBar.setScrollFactor(0);
        this.healthBar.setDepth(3);

        this.healthLabel = this.add.text(2, 14, 'Vida', {fontSize:'18px', fill:'#ffffff'});
        this.healthLabel.fixedToCamera = true;
        this.healthLabel.visible = true;
        this.healthLabel.setScrollFactor(0);
        this.healthLabel.setDepth(3);

        this.scoreLabel = this.add.text(300, 14, 'Puntuación: ', {fontSize:'18px', fill:'#ffffff'});
        this.scoreLabel.fixedToCamera = true;
        this.scoreLabel.visible = true;
        this.scoreLabel.setScrollFactor(0);
        this.scoreLabel.setDepth(3);

        this.scoreVariable = this.add.text(450, 14, this.scoreVariable, {fontSize:'18px', fill:'#ffffff'});
        this.scoreVariable.fixedToCamera = true;
        this.scoreVariable.visible = true;
        this.scoreVariable.setScrollFactor(0);
        this.scoreVariable.setDepth(3);
        
        // ----------------------------------------------------------------------------------------
    }

    calculateDamage(){
        this.healthBar.x -= 10;
        console.log(this.healthBar.x);
        if(this.healthBar.x == -100){
            this.player.disappear();
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                this.scene.start(scene);
            }, this);
            fadeColor = { r: 5, g: 4, b: 4 };
            this.gameover.visible = true;
            this.cameras.main.fadeOut(3000, fadeColor.r, fadeColor.g, fadeColor.b);
        }
    }

    addPlayer({
        x = 64,
        y = 64
    } = {}) {
        this.player = new Player(this, x, y, 'player', 0, this.startPosition.facing);
        this.cameras.main.startFollow(this.player, true);
    }

    addBadguy({
        x = 64,
        y = 64
    } = {}) {
        this.badguy = new Badguy(this, x, y, 'badguy', 0, this.startPosition.facing);
        //this.cameras.main.startFollow(this.badguy, false);
    }

    addExit({
        x = -480,
        y = 0,
        w = 512,
        h = 2048,
        startX = 64,
        startY = 64,
        facing = 'right',
        scene = false
    } = {}) {
        if (!scene) {
            return;
        }
        let exit = {
            rect: new Phaser.Geom.Rectangle(x, y, w, h),
            startX: startX,
            startY: startY,
            facing: facing,
            scene: scene
        };
        this.exits.push(exit);
    }

    checkExits()
    {
        if (!this.exits || !this.exits.length || !this.player) {
            return;
        }
        for (let exit of this.exits) {
            if (Phaser.Geom.Rectangle.ContainsPoint(exit.rect, this.player)) {
                this.leaveThroughExit(exit);
                this.player.disappear();
                this.exits = [];
                break;
            }
        }
    }

    leaveThroughExit({
        startX = 0,
        startY = 0,
        facing = 'right',
        scene = false
    } = {}) {
        if (!scene) {
            return;
        }
        this.startPosition.setExit({ x: startX, y: startY, facing: facing, scene: scene });
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
            this.scene.start(scene);
        }, this);
        fadeColor = { r: 5, g: 4, b: 4 };
        this.cameras.main.fadeOut(3000, fadeColor.r, fadeColor.g, fadeColor.b);
    }

    resizeField(w, h)
    {
        this.gamepaused.x = w / 2;
        this.gamepaused.y = h / 2;
        if (this.centerMap) {
            this.cameras.main.setBounds((this.centerMap.widthInPixels - w) / 2, (this.centerMap.heightInPixels - h) / 2, w, h);
        }
    }

    onGamePause()
    {
        this.gamepaused.visible = true;
    }

    onGameResume()
    {
        this.gamepaused.visible = false;
    }
}

export default Level;
