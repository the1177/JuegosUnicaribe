import 'phaser';
import Boot from './scenes/Boot.js';
import Preloader from './scenes/Preloader.js';
import StartPosition from './plugins/StartPosition.js';
import SimplePlatformerControls from './plugins/SimplePlatformerControls.js';
import DungeonPlugin from './plugins/DungeonPlugin.js';
import DungeonLevel from './scenes/DungeonLevel.js';

window.fadeColor = { r: 5, g: 4, b: 4 };

// this controls how much the pixels are scaled, try changing it and have fun
 window.maxSize = 1200;
//window.maxSize = 960;
//window.maxSize = 640;
//window.maxSize = 320;

let longestSide = Math.max(window.innerWidth, window.innerHeight);
let zoom = 2 * Math.max(1, Math.floor(longestSide / window.maxSize));

var config = {
    gameTitle: 'Diagoros - The Laberinth',
    type: Phaser.WEBGL,
    parent: 'phaser-game',
    width: window.innerWidth / zoom,
    height: window.innerHeight / zoom,
    backgroundColor: '#050404',
    pixelArt: true,
    zoom: zoom,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            //debug: true
        }
    },
    plugins: {
        scene: [
            { key: 'simplePlatformerControls', plugin: SimplePlatformerControls, mapping: 'controls' }
        ],
        global: [
            { key: 'startPosition', plugin: StartPosition, mapping: 'startPosition', start: true },
            { key: 'DungeonPlugin', plugin: DungeonPlugin, mapping: 'dungeon', start: true }
        ]
    },
    input: {
        gamepad: true
    },
    scene: [
        Boot,
        Preloader,
        DungeonLevel
    ]
};

// start game
window.game = new Phaser.Game(config);
