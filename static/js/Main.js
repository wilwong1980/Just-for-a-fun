var MyGame = MyGame || {};

var width = window.innerWidth;
var height = window.innerHeight;
var gameWidth = 750;
var gameHeight = 1334;

// console.log(width +','+height);

MyGame.game = new Phaser.Game(gameWidth, gameHeight, Phaser.WEBGL, '#game');
MyGame.game.state.add('Boot', MyGame.Boot);
MyGame.game.state.add('Preload', MyGame.Preload);
MyGame.game.state.add('MainMenu', MyGame.MainMenu);
MyGame.game.state.add('Game', MyGame.Game);
MyGame.game.state.start('Boot');

// 为数组增加洗牌算法 Fisher–Yates shuffle
Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
};

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
};

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}