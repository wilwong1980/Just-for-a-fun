var MyGame = MyGame || {};

var width = window.innerWidth;
var height = window.innerHeight;
var gameWidth = 629;
var gameHeight = 1125;

console.log(width +','+height);

MyGame.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '#game');
MyGame.game.state.add('Boot', MyGame.Boot);
MyGame.game.state.add('Preload', MyGame.Preload);
MyGame.game.state.add('MainMenu', MyGame.MainMenu);
MyGame.game.state.add('Game', MyGame.Game);
MyGame.game.state.start('Boot');