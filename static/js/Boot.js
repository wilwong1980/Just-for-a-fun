var MyGame = MyGame || {};

MyGame.Boot = function () {
};

MyGame.Boot.prototype = {
    preload: function () {
        //assets we'll use in the loading screen
        this.load.image('dizhu', '/static/images/dizhu.jpg');
    },

    create: function () {
        console.log('Boot state');
        this.game.stage.backgroundColor = 0x2a2a2a;
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        // this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.setScreenSize = true;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // this.game.time.desiredFps = 60;

        // logo 展示可以放到 preload 场景
        // this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'dizhu');
        // this.logo.anchor.setTo(0.5, 0.5);

        //physics system for movement
        // this.game.physics.startSystem(Phaser.Physics.ARCADE);


        // this.state.start('Preload');

        this.input.onTap.add(this.gofull, this)
    },

    update: function () {
        // 旋转logo精灵
        // this.logo.angle += 1;
    },
    
    render: function () {
        this.debug = this.game.debug;
        this.game.debug.font = '40px monospace';
        this.game.debug.lineHeight = 30;
        this.debug.device(420, 200, '#62978a');
        this.debug.scale(0,0,'#62978a');
    },

    gofull: function () {
        // this.scale.startFullScreen(false);
        this.state.start('Preload');
    }
};