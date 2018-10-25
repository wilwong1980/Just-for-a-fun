var MyGame = MyGame || {};

MyGame.Game = function () {
};

MyGame.Game.prototype = {
    preload: function () {

    },

    create: function () {
        console.log('Game state');
        console.log(this);
        this.input.onTap.add(function () {
                this.state.start('MainMenu');
            });
    },

    update: function () {

    }
};