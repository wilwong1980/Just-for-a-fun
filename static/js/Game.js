var MyGame = MyGame || {};

MyGame.Game = function () {
};

MyGame.Game.prototype = {
    preload: function () {
        this.load.json('Cards', '/static/images/Cards.json');
        this.load.json('Avatar', '/static/images/avatar.json');
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
        this.buttonAudio = this.add.audio('sndClick');
    },

    create: function () {
        console.log('Game state');
        // //顶部背景
        // this.add.sprite(0, 70, 'gameBackGround');
        // // 左侧窗帘
        // this.add.sprite(0, 70, 'curtain');
        // // 右侧窗帘 左侧窗帘反转
        // var curtain2 = this.add.sprite(644, 70, 'curtain');
        // curtain2.width = -curtain2.width;
        // //底部背景牌桌
        // this.add.sprite(0, 275, 'gameTableGreen');
        // // 公牌河牌区
        // var center1 = this.add.sprite(this.game.width / 2, 450, 'gameTableCenter');
        // center1.anchor.setTo(0.5);
        // // 手牌区
        // var center2 = this.add.sprite(this.game.width / 2, 800, 'gameTableCenter');
        // center2.anchor.setTo(0.5);
        // pokers

        // 背景

        this.add.sprite(0,0, 'gameBackGround');

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
        this.groupRiver = this.add.group();
        this.groupTurn = this.add.group();
        this.groupFlop = this.add.group();

        this.groupChip = this.add.group();
        this.groupChipNum = this.add.group();
        this.groupButton = this.add.group();
        this.groupAvatar = this.add.group();
        this.groupSeat = this.add.group();



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
        this.potBar = this.add.sprite(this.game.width / 2, 340, 'accountBar');
        this.potBar.anchor.setTo(0.5);
        // console.log(this.potBar.width);
        // console.log(this.potBar.height);
        this.potMoney = this.add.text(this.game.width / 2, 340, 0, {
            // font: "30px Arial",
            fill: "#ffffff"
        });
        // this.potMoney = this.add.text(this.potBar.width / 2, this.potBar.height/2, 0, {
        //     // font: "30px Arial",
        //     fill: "#ffffff"
        // });

        this.potMoney.anchor.setTo(0.5);
        // this.potBar.addChild(this.potMoney);


        // flop card
        this.timerFlop = this.time.create(false);
        this.counterFlop = [0];
        this.flop1 = this.groupFlop.create(563, 387, 'Cards', 'CardsBack/cardBack_blue1');
        this.flop1.moveTo = {x: 120, y: 500};

        this.flop2 = this.groupFlop.create(563, 387, 'Cards', 'CardsBack/cardBack_blue1');
        this.flop2.moveTo = {x: 220, y: 500};

        this.flop3 = this.groupFlop.create(563, 387, 'Cards', 'CardsBack/cardBack_blue1');
        this.flop3.moveTo = {x: 320, y: 500};

        this.flopShowStatus = false;

        for (let i = 0; i < this.groupFlop.length; i++) {
            let poker = this.groupFlop.children[i];
            // console.log(poker);
            poker.anchor.setTo(0.5);
            poker.scale = {x: 0.5, y: 0.5};
            poker.timeContinue = 50;
        }
        // this.flop1.card.anchor.setTo(0.5);
        // this.flop1.card.scale = {x: 0.5, y: 0.5};
        // this.flop1.timecontinue = 50;


        // hitButton
        this.buttonRiverPlace = this.groupButton.create(100, 1080, 'hit');
        this.buttonRiverShow = this.groupButton.create(250, 1080, 'hit');

        this.buttonTurnPlace = this.groupButton.create(100, 1010, 'hit');
        this.buttonTurnShow = this.groupButton.create(250, 1010, 'hit');

        this.buttonFlopShow = this.groupButton.create(400, 1010, 'hit');
        this.buttonFlopPlace = this.groupButton.create(550, 1010, 'hit');

        // console.log(this.buttonCheck.tint);
        this.buttonFlopPlace.tint = 0xc06d76;
        this.buttonFlopPlace.events.onInputDown.add(this.buttonHit, this);
        this.buttonFlopShow.events.onInputDown.add(this.buttonCallHit, this);
        this.buttonTurnPlace.events.onInputDown.add(this.buttonTurnPlaceHit, this);
        this.buttonTurnShow.events.onInputDown.add(this.buttonTurnShowHit, this);

        this.buttonRiverPlace.events.onInputDown.add(this.buttonRiverPlaceHit, this);
        this.buttonRiverShow.events.onInputDown.add(this.buttonRiverShowHit, this);


        for (let i = 0; i < this.groupButton.length; i++) {
            let button = this.groupButton.children[i];
            button.anchor.setTo(0.5);
            button.scale = {x: 0.6, y: 0.6};
            button.inputEnabled = false;
        }

        this.turn = this.groupTurn.create(563, 387, 'Cards', 'CardsBack/cardBack_blue1');
        this.turn.anchor.setTo(0.5);
        this.turn.scale = {x: 0.5, y: 0.5};
        this.turn.moveTo = {x: 420, y: 500};

        this.river = this.groupRiver.create(563, 387, 'Cards', 'CardsBack/cardBack_blue1');
        this.river.anchor.setTo(0.5);
        this.river.scale = {x: 0.5, y: 0.5};
        this.river.moveTo = {x: 520, y: 500};



        // this.Avater = this.groupAvater.create(0, 0, 'Avater', 'avater/avater9');
        // this.Avater.scale ={x:0.3,y:0.3};
        var avt = this.cache.getJSON('Avatar');
        // console.log(avt.frames);
        var avtRst = Object.keys(avt.frames).slice(0, 16);
        console.log(avtRst);
        this.avatars = avtRst.shuffle();
        console.log(this.avatars);
        var avtMarkPos = [{x:180,y:30},{x:350,y:30},{x:10,y:230},{x:10,y:430},{x:10,y:630},{x:520,y:230},{x:520,y:430},{x:520,y:630},{x:265,y:800}];
        var avtPos =[{x:65, y:250},{x:65, y:550},{x:65, y:850},{x:400, y:100},{x:400, y:200},{x:400, y:300}];
        var TempUsers = ['张三','李四','王五','赵六','老湿','叫兽','砖家','蜀黍','超人'].shuffle();
        // for(let i=0; i < 6; i++){
        //     let avatar = this.groupAvatar.create(avtPos[i].x, avtPos[i].y, 'Avatar', this.avatars.shift());
        //     avatar.anchor.setTo(0.5);
        //     // avatar.scale={x:0.2,y:0.2}
        // }
        for(let i =0; i<avtMarkPos.length;i++){
            let avatarMark = this.groupSeat.create(avtMarkPos[i].x,avtMarkPos[i].y,'avatarMark');
            let avatar = this.groupAvatar.create(avatarMark.width/2, avatarMark.height/2, 'Avatar', this.avatars.shift());
            let userName = this.add.text(avatarMark.width/2, 20, TempUsers.shift(), {
            font: "20px Arial",
            fill: "#ffffff"
        });
            let Money = this.add.text(avatarMark.width/2, avatarMark.height - 10, 1000, {
            font: "20px Arial",
            fill: "#ffffff"
        });
            avatar.anchor.setTo(0.5);
            userName.anchor.setTo(0.5);
            Money.anchor.setTo(0.5);
            avatarMark.addChild(avatar);
            avatarMark.addChild(userName);
            avatarMark.addChild(Money);
        }

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
        let tween1 = this.add.tween(hand.card).to({x: 535, y: 310}, 200, Phaser.Easing.Linear.None);
        // 下发动画
        let tween2 = this.add.tween(hand.card).to({x: this.game.width / 2, y: 900}, 500, Phaser.Easing.Linear.None);
        // 左平移
        let tween3 = this.add.tween(hand.card).to({
            x: this.game.width / 2 + hand.moveTo,
            y: 900
        }, 80, Phaser.Easing.Linear.None);
        // 翻转
        let tween4 = this.add.tween(hand.card.scale).to({x: 0, y: 1.2}, 200 / 2, Phaser.Easing.Linear.None);
        // 展示
        let cardAudio = this.cardSound.randomElement();
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

    flopPlace: function (target, count, timer) {
        // console.log(this.cardSound);
        let cardAudio = this.cardSound.randomElement();
        // console.log(count);

        if (count[0] < 3) {
            cardAudio.play();
            let card = target.children[count[0]];
            // 抽取动画
            var tween1 = this.add.tween(card).to({x: 535, y: 310}, 200, Phaser.Easing.Linear.None);
            // 下发动画
            var tween2 = this.add.tween(card).to(card.moveTo, 500, Phaser.Easing.Linear.None);
            tween1.onComplete.add(function () {
                tween2.start();
            });
            tween1.start();
            count[0]++;
            timer.add(1000, this.flopPlace, this, target, count, timer);
            timer.start();
        }
    },

    flopShow: function (target, count, timer) {
        let cardAudio = this.cardSound.randomElement();
        if (!this.flopShowStatus) {
            count[0] = 0;
            this.flopShowStatus = true;
        }
        if (count[0] < 3) {
            cardAudio.play();
            let card = target.children[count[0]];
            // 翻转牌
            let tween1 = this.add.tween(card.scale).to({x: 0, y: 1.2}, 200, Phaser.Easing.Linear.None);
            // 展示牌
            let tween2 = this.add.tween(card.scale).to({x: 0.7, y: 0.7}, 200 / 2, Phaser.Easing.Linear.None);
            tween1.onComplete.add(function () {
                card.frameName = this.result2.shift();
                tween2.start();
            }, this);
            tween1.start();
            count[0]++;
            timer.add(1000, this.flopShow, this, target, count, timer);
            timer.start();
        }
    },

    cardPlace: function (card) {
        let cardAudio = this.cardSound.randomElement();
        cardAudio.play();
        // 抽取动画
        var tween1 = this.add.tween(card).to({x: 535, y: 310}, 200, Phaser.Easing.Linear.None);
        // 下发动画
        var tween2 = this.add.tween(card).to(card.moveTo, 500, Phaser.Easing.Linear.None);
        tween1.onComplete.add(function () {
            tween2.start();
        }, this);
        tween1.start();
    },

    cardShow: function (card) {
        let cardAudio = this.cardSound.randomElement();
        cardAudio.play();
        // 翻转牌
        let tween1 = this.add.tween(card.scale).to({x: 0, y: 1.2}, 200, Phaser.Easing.Linear.None);
        // 展示牌
        let tween2 = this.add.tween(card.scale).to({x: 0.7, y: 0.7}, 200 / 2, Phaser.Easing.Linear.None);
        tween1.onComplete.add(function () {
            card.frameName = this.result2.shift();
            tween2.start();
        }, this);
        tween1.start();
    },

    chipPlace: function (chip) {
        // console.log(chip.data);
        var chipAudio = this.chipSound.randomElement();
        chipAudio.play();
        this.potMoney.text = parseInt(this.potMoney.text) + parseInt(chip.data.number);
        // console.log(this.potMoney.text);
        let subchip = this.groupChip.create(chip.x, chip.y, chip.data.color);
        subchip.anchor.setTo(0.5);
        let tween = this.add.tween(subchip).to({
            x: getRandomNumber(270, 335),
            y: getRandomNumber(470, 530)
        }, 500, Phaser.Easing.Quintic.Out);
        tween.start();
        if (this.potMoney.text > 0) {
            for (let i = 0; i < this.groupButton.length; i++) {
                let button = this.groupButton.children[i];
                button.inputEnabled = true;
                button.tint = 16777215;
            }
        }
    },

    buttonHit: function () {
        this.buttonAudio.play();
        this.groupChip.callAll('kill');
        this.flopPlace(this.groupFlop, this.counterFlop, this.timerFlop);
    },

    buttonCallHit: function () {
        this.buttonAudio.play();
        this.groupChip.callAll('kill');
        this.flopShow(this.groupFlop, this.counterFlop, this.timerFlop);
    },

    buttonTurnPlaceHit: function () {
        this.buttonAudio.play();
        this.groupChip.callAll('kill');
        this.cardPlace(this.turn);
    },

    buttonTurnShowHit: function () {
        this.buttonAudio.play();
        this.groupChip.callAll('kill');
        this.cardShow(this.turn);
    },

    buttonRiverPlaceHit: function () {
        this.buttonAudio.play();
        this.groupChip.callAll('kill');
        this.cardPlace(this.river);
    },

    buttonRiverShowHit: function () {
        this.buttonAudio.play();
        this.groupChip.callAll('kill');
        this.cardShow(this.river);
    },

};