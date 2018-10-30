var MyGame = MyGame || {};

MyGame.Preload = function () {
};

MyGame.Preload.prototype = {
    preload: function () {

        // logo 展示
        this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'dizhu');
        this.logo.anchor.setTo(0.5);

        // load game assets
        this.load.image('bg0','/static/images/bg0.jpg');
        this.load.image('bg1','/static/images/bg1.png');
        this.load.image('name','/static/images/name.png');
        this.load.image('curtain','/static/images/curtain.png');
        this.load.image('clound','/static/images/clound.png');
        this.load.image('start0','/static/images/start0.png');
        this.load.image('accountBar','/static/images/accountBar.png');
        this.load.image('light0','/static/images/light0.png');
        this.load.image('light1','/static/images/light1.png');
        this.load.image('light2','/static/images/light2.png');
        this.load.image('mask0','/static/images/mask0.png');
        this.load.image('mask1','/static/images/mask1.png');
        this.load.image('mask2','/static/images/mask2.png');
        this.load.image('smoke0','/static/images/smoke0.png');
        this.load.image('smoke1','/static/images/smoke1.png');
        this.load.image('cigar','/static/images/cigar.png');
        this.load.image('cigarette','/static/images/cigarette.png');
        this.load.image('wine0','/static/images/wine0.png');
        this.load.image('wine1','/static/images/wine1.png');
        this.load.image('wine2','/static/images/wine2.png');
        this.load.image('napkin','/static/images/napkin.png');
        this.load.image('chipsRed','/static/images/chipsRed.png');
        this.load.image('chipsBlack','/static/images/chipsBlack.png');
        this.load.image('chipsGreen','/static/images/chipsGreen.png');
        this.load.image('chipsBlue','/static/images/chipsBlue.png');
        this.load.image('chipSMblue','/static/images/chipSMblue.png');
        this.load.image('chipSMblack','/static/images/chipSMblack.png');
        this.load.image('chipSMgreen','/static/images/chipSMgreen.png');
        this.load.image('chipSMred','/static/images/chipSMred.png');
        this.load.image('chipNoBlack','/static/images/chipNoBlack.png');
        this.load.image('chipNoBlue','/static/images/chipNoBlue.png');
        this.load.image('chipNoGreen','/static/images/chipNoGreen.png');
        this.load.image('chipNoRed','/static/images/chipNoRed.png');
        this.load.image('chipBigBlack','/static/images/chipBigBlack.png');
        this.load.image('chipBigBlue','/static/images/chipBigBlue.png');
        this.load.image('chipBigGreen','/static/images/chipBigGreen.png');
        this.load.image('chipBigRed','/static/images/chipBigRed.png');
        this.load.image('gameTablePurple','/static/images/gameTablePurple.png');
        this.load.image('gameTableGreen','/static/images/gameTableGreen.png');
        this.load.image('gameTableRed','/static/images/gameTableRed.png');
        this.load.image('gameBackGround','/static/images/gameBackGround.png');
        this.load.image('pokersBackGreen','/static/images/pokersBackGreen.png');
        this.load.image('pokersBackPurple','/static/images/pokersBackPurple.png');
        this.load.image('pokersBackRed','/static/images/pokersBackRed.png');
        this.load.image('gameTableCenter','/static/images/gameTableCenter.png');
        this.load.image('dices','/static/images/dices.png');
        this.load.image('pokerBackGreen','/static/images/pokerBackGreen.png');
        this.load.image('pokerBackPurple','/static/images/pokerBackPurple.png');
        this.load.image('hit','/static/images/hit1.png');

        this.load.audio('sndLoop', '/static/audio/sndLoop.ogg');
        this.load.audio('sndClick', '/static/audio/sndClick.ogg');
        this.load.audio('sndCard1', '/static/audio/sndCard1.ogg');
        this.load.audio('sndCard2', '/static/audio/sndCard2.ogg');
        this.load.audio('sndCard3', '/static/audio/sndCard3.ogg');
        this.load.audio('sndChip1', '/static/audio/sndChip1.ogg');
        this.load.audio('sndChip2', '/static/audio/sndChip2.ogg');
        this.load.audio('sndChip3', '/static/audio/sndChip3.ogg');
        this.load.audio('sndChip4', '/static/audio/sndChip4.ogg');
        this.load.audio('sndChip5', '/static/audio/sndChip5.ogg');
        this.load.audio('sndChip6', '/static/audio/sndChip6.ogg');

        this.load.atlasJSONHash('walk', '/static/images/walk.png', '/static/images/walk.json');
        this.load.atlasJSONHash('Cards', '/static/images/Cards.png', '/static/images/Cards.json');
        // this.load.atlasJSONHash('cardsBack', '/static/images/cardsBack.png', '/static/images/cardsBack.json');

        // this.load.atlasJSONHash('cityscene', '/static/images/cityscene.png', '/static/images/cityscene.json');
    },

    create: function () {
        console.log('Preload state');

        this.state.start('MainMenu');
    },

    update: function () {

    },

    render: function () {
        this.debug = this.game.debug;
        this.game.debug.font = '40px monospace';
        this.game.debug.lineHeight = 30;
        this.debug.device(420, 200, '#62978a');
        this.debug.scale(0,0,'#62978a');
    }
};