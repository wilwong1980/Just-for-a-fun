var MyGame = MyGame || {};

MyGame.Game = function () {
};

MyGame.Game.prototype = {
    preload: function () {
        this.load.json('Cards', '/static/images/Cards.json');
        this.cardSound = [this.add.audio('sndCard1'), this.add.audio('sndCard2'), this.add.audio('sndCard3')];
        this.cardSound.shuffle();
        this.chipSound = [
            this.add.audio('sndChip1'),
            this.add.audio('sndChip2'),
            this.add.audio('sndChip3'),
            this.add.audio('sndChip4'),
            this.add.audio('sndChip5'),
            this.add.audio('sndChip6'),
        ];
        this.chipSound.shuffle();
    },

    create: function () {
        console.log('Game state');
        //顶部背景
        this.add.sprite(0, 70, 'gameBackGround');
        // 左侧窗帘
        this.add.sprite(0, 70, 'curtain');
        // 右侧窗帘 左侧窗帘反转
        var curtain2 = this.add.sprite(644, 70, 'curtain');
        curtain2.width = -curtain2.width;
        //底部背景牌桌
        this.add.sprite(0, 275, 'gameTableGreen');
        // // 公牌河牌区
        // var center1 = this.add.sprite(this.game.width / 2, 450, 'gameTableCenter');
        // center1.anchor.setTo(0.5);
        // // 手牌区
        // var center2 = this.add.sprite(this.game.width / 2, 800, 'gameTableCenter');
        // center2.anchor.setTo(0.5);
        // pokers
        var pokers = this.add.sprite(520, 327, 'pokersBackGreen');

        // 手牌1
        var hand1 = {};
        hand1.card = this.add.sprite(563, 387, 'Cards', 'CardsBack/cardBack_blue1');
        hand1.card.anchor.setTo(0.5);
        hand1.card.scale = {x: 0.4, y: 0.4};
        hand1.timeContinue = 50;
        hand1.moveTo = -50;

        // 手牌2
        var hand2 = {};
        hand2.card = this.add.sprite(563, 387, 'Cards', 'CardsBack/cardBack_blue1');
        hand2.card.anchor.setTo(0.5);
        hand2.card.scale = {x: 0.4, y: 0.4};
        hand2.timeContinue = 50;
        hand2.moveTo = 50;

        // 手牌计数器
        this.handCardNumber = 0;
        // 手牌动画计时器
        this.timerHandPoker = this.time.create(false);
        this.timerHandPoker.add(hand1.timeContinue, this.handPlace, this, hand1, this.timerHandPoker, hand2);
        this.timerHandPoker.start();


        // // 牌精灵
        // this.cards = this.add.sprite(this.game.width / 2, 300, 'Cards', 'CardsBack/cardBack_blue2');
        // // console.log(this.cards);
        // // 设置牌精灵焦点居中
        // this.cards.anchor.setTo(0.5);
        // // 牌精灵缩小至0。7
        // this.cards.scale = {x: 0.7, y: 0.7};
        // // // 牌动画设置
        // // this.cards.animations.add('cards', Phaser.Animation.generateFrameNames('Cards/cardClubs', 1, 14, '', 2),10,true,false);
        // // // 牌动画播放
        // // this.cards.animations.play('cards');
        //
        // this.cards.isFlipping = false;
        // this.cards.inputEnabled = true;
        // this.cards.events.onInputDown.add(this.filpTween, this, 'filpHollow');


        var cards = this.cache.getJSON('Cards');
        // console.log(cards.frames);
        var result = Object.keys(cards.frames).slice(0, 53);
        // console.log(result);
        this.result2 = result.shuffle();
        // console.log(this.result2);

        // this.input.onTap.add(this.goMenue, this);

        // group
        this.groupFlop = this.add.group();
        this.groupTurn = this.add.group();
        this.groupRiver = this.add.group();
        this.groupChip = this.add.group();
        this.groupChipNum = this.add.group();


        // chip
        // this.chipGreen = this.groupChip.create(160, 760, 'chipSMgreen');
        // this.chipBlue = this.groupChip.create(260, 690, 'chipSMblue');
        // this.chipRed = this.groupChip.create(360, 760, 'chipSMred');
        // this.chipBlack = this.groupChip.create(460, 690, 'chipSMblack');
        //
        // for (let i = 0; i < this.groupChip.length; i++) {
        //     let chip = this.groupChip.children[i];
        //     chip.anchor.setTo(0.5);
        // }

        // chipNum
        this.chipGreenNum = {};
        this.chipBlueNum = {};
        this.chipRedNum = {};
        this.chipBlackNum = {};

        this.chipGreenNum.chip = this.groupChipNum.create(160, 760, 'chipNoGreen');
        this.chipGreenNum.chip.data = {number: 5, color: 'chipSMgreen'};
        this.chipBlueNum.chip = this.groupChipNum.create(260, 690, 'chipNoBlue');
        this.chipBlueNum.chip.data = {number: 25, color: 'chipSMblue'};
        this.chipRedNum.chip = this.groupChipNum.create(360, 760, 'chipNoRed');
        this.chipRedNum.chip.data = {number: 50, color: 'chipSMred'};
        this.chipBlackNum.chip = this.groupChipNum.create(460, 690, 'chipNoBlack');
        this.chipBlackNum.chip.data = {number: 100, color: 'chipSMblack'};

        // function alterThis(param) {
        //     console.log(param);
        // }

        for (var i = 0; i < this.groupChipNum.length; i++) {
            let chip = this.groupChipNum.children[i];
            // console.log(chip.data);
            chip.scale = {x: 0.8, y: 0.8};
            chip.anchor.setTo(0.5);
            chip.inputEnabled = true;
            // chip.events.onInputDown.add(function (chip) {
            //     alterThis(chip.data.number);
            // }, this);
            chip.events.onInputDown.add(this.chipPlace, this, chip);
        }


        //potBar
        this.potBar = this.add.sprite(this.game.width / 2, 390, 'accountBar');
        this.potBar.anchor.setTo(0.5);
        console.log(this.potBar.width);
        console.log(this.potBar.height);
        this.potMoney = this.add.text(this.game.width / 2, 390, 0, {
            // font: "30px Arial",
            fill: "#ffffff"
        });

        this.potMoney.anchor.setTo(0.5);


        // flop card
        // this.flop1 = {};
        // this.flop1.card = this.groupFlop.create(563, 387, 'Cards', 'CardsBack/cardBack_blue1');
        // this.flop1.card.anchor.setTo(0.5);
        // this.flop1.card.scale = {x: 0.5, y: 0.5};
        // this.flop1.timecontinue = 50;
        // this.flop1.moveTo = {x: 80, y: 500};

        // this.flopPlace(this.flop1);

    },

    update: function () {
        // this.walk.x += 3;
        // if (this.walk.x > 800) {
        //     this.walk.x = -50;
        // }
    },

    goMenue: function () {
        this.state.start('MainMenu');
    },

    filpTween: function (param) {
        console.log(param);
        this.cards.isFlipping = true;
        var tween = this.add.tween(this.cards.scale).to({x: 0, y: 1.2}, 200 / 2, Phaser.Easing.Linear.None);
        tween.start();
        tween.onComplete.add(this.filpBack, this, 'call filpBack')
    },

    filpBack: function (param) {
        console.log(param);
        this.cards.frame = this.cards.frame + 10;
        var tween = this.add.tween(this.cards.scale).to({x: 1, y: 1}, 200 / 2, Phaser.Easing.Linear.None);
        tween.start();
        tween.onComplete.add(function () {
            this.cards.isFlipping = false;
        }, this)

    },

    handPlace: function (hand, timer, nextCard) {
        // 抽取动画
        var tween1 = this.add.tween(hand.card).to({x: 535, y: 310}, 200, Phaser.Easing.Linear.None);
        // 下发动画
        var tween2 = this.add.tween(hand.card).to({x: this.game.width / 2, y: 900}, 500, Phaser.Easing.Linear.None);
        // 左平移
        var tween3 = this.add.tween(hand.card).to({
            x: this.game.width / 2 + hand.moveTo,
            y: 900
        }, 80, Phaser.Easing.Linear.None);
        // 翻转
        var tween4 = this.add.tween(hand.card.scale).to({x: 0, y: 1.2}, 200 / 2, Phaser.Easing.Linear.None);
        // 展示
        var cardAudio = this.cardSound.randomElement();
        cardAudio.play();
        tween1.onComplete.add(function () {
            tween2.onComplete.add(function () {
                tween3.onComplete.add(function () {
                    tween4.onComplete.add(function () {
                        hand.card.frameName = this.result2.shift();
                        var tween5 = this.add.tween(hand.card.scale).to({
                            x: 0.7,
                            y: 0.7
                        }, 200 / 2, Phaser.Easing.Linear.None);
                        tween5.start();
                        this.handCardNumber++;
                        if (this.handCardNumber < 2) {
                            timer.add(nextCard.timeContinue, this.handPlace, this, nextCard, timer, nextCard);
                            timer.start();
                        }
                        if (this.handCardNumber === 2) {
                            // timer.add(1000, this.flopPlace, this, this.flop1, timer, [this.flop2, this.flop3]);
                        }
                    }, this);
                    tween4.start();
                }, this);
                tween3.start();
            }, this);
            tween2.start();
        }, this);
        tween1.start();
    },

    flopPlace: function (poker, timer, next) {
        var cardAudio = this.cardSound.randomElement();
        cardAudio.play();
        // 抽取动画
        var tween1 = this.add.tween(poker.card).to({x: 535, y: 310}, 200, Phaser.Easing.Linear.None);
        // 下发动画
        var tween2 = this.add.tween(poker.card).to(poker.moveTo, 500, Phaser.Easing.Linear.None);
        tween1.onComplete.add(function () {
            tween2.start();
        });
        tween1.start();
        if (next) {
            timer.add(1000, this.flopPlace, next.shift(), timer, next.shift())
        }
    },

    chipPlace: function (chip) {
        // console.log(chip.data);
        var chipAudio = this.chipSound.randomElement();
        chipAudio.play();
        this.potMoney.text = parseInt(this.potMoney.text) + parseInt(chip.data.number);
        // console.log(this.potMoney.text);
        let subchip = this.groupChip.create(chip.x, chip.y, chip.data.color);
        subchip.anchor.setTo(0.5);
        let tween = this.add.tween(subchip).to({x: getRandomNumber(270,335), y: getRandomNumber(470,530)}, 400, Phaser.Easing.Back.Out);
        tween.start();
    }
};