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

        this.add.sprite(0, 0, 'gameBackGround');

        // var pokers = this.add.sprite(520, 327, 'pokersBackGreen');

        // 手牌1
        var hand1 = {};
        hand1.card = this.add.sprite(563, 387, 'Cards', 'CardsBack/cardBack_blue1');
        hand1.card.anchor.setTo(0.5);
        hand1.card.scale = {x: 0.4, y: 0.4};
        hand1.timeContinue = 50;
        hand1.moveTo = -30;

        // 手牌2
        var hand2 = {};
        hand2.card = this.add.sprite(563, 387, 'Cards', 'CardsBack/cardBack_blue1');
        hand2.card.anchor.setTo(0.5);
        hand2.card.scale = {x: 0.4, y: 0.4};
        hand2.timeContinue = 50;
        hand2.moveTo = 35;

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

        // load json card info
        var cards = this.cache.getJSON('Cards');
        // 取52个出来
        var result = Object.keys(cards.frames).slice(0, 53);
        // 洗牌
        this.result2 = result.shuffle();

        // 去菜单场景
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

        // this.groupCardBack = this.add.group();

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
        // this.chipGreenNum = {};
        // this.chipBlueNum = {};
        // this.chipRedNum = {};
        // this.chipBlackNum = {};
        //
        // this.chipGreenNum.chip = this.groupChipNum.create(160, 760, 'chipNoGreen');
        // this.chipGreenNum.chip.data = {number: 5, color: 'chipSMgreen'};
        // this.chipBlueNum.chip = this.groupChipNum.create(260, 690, 'chipNoBlue');
        // this.chipBlueNum.chip.data = {number: 25, color: 'chipSMblue'};
        // this.chipRedNum.chip = this.groupChipNum.create(360, 760, 'chipNoRed');
        // this.chipRedNum.chip.data = {number: 50, color: 'chipSMred'};
        // this.chipBlackNum.chip = this.groupChipNum.create(460, 690, 'chipNoBlack');
        // this.chipBlackNum.chip.data = {number: 100, color: 'chipSMblack'};

        // 底牌
        let cardBackY=250;
        for(let i =0; i< 53; i++){
            let cardBack = this.add.sprite(315, cardBackY, 'Cards', 'CardsBack/cardBack_blue2');
            cardBack.anchor.setTo(0.5);
            cardBack.scale = {x:0.45, y:0.45};
            cardBackY -= 0.2;
        }


        for (let i = 0; i < this.groupChipNum.length; i++) {
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


        // // hitButton
        // this.buttonRiverPlace = this.groupButton.create(100, 1080, 'hit');
        // this.buttonRiverShow = this.groupButton.create(250, 1080, 'hit');
        //
        // this.buttonTurnPlace = this.groupButton.create(100, 1010, 'hit');
        // this.buttonTurnShow = this.groupButton.create(250, 1010, 'hit');
        //
        // this.buttonFlopShow = this.groupButton.create(400, 1010, 'hit');
        // this.buttonFlopPlace = this.groupButton.create(550, 1010, 'hit');
        //
        // // console.log(this.buttonCheck.tint);
        // this.buttonFlopPlace.tint = 0xc06d76;
        // this.buttonFlopPlace.events.onInputDown.add(this.buttonHit, this);
        // this.buttonFlopShow.events.onInputDown.add(this.buttonCallHit, this);
        // this.buttonTurnPlace.events.onInputDown.add(this.buttonTurnPlaceHit, this);
        // this.buttonTurnShow.events.onInputDown.add(this.buttonTurnShowHit, this);
        //
        // this.buttonRiverPlace.events.onInputDown.add(this.buttonRiverPlaceHit, this);
        // this.buttonRiverShow.events.onInputDown.add(this.buttonRiverShowHit, this);
        //
        //
        // for (let i = 0; i < this.groupButton.length; i++) {
        //     let button = this.groupButton.children[i];
        //     button.anchor.setTo(0.5);
        //     button.scale = {x: 0.6, y: 0.6};
        //     button.inputEnabled = false;
        // }

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
        let avt = this.cache.getJSON('Avatar');
        // console.log(avt.frames);
        let avtRst = Object.keys(avt.frames).slice(0, 16);
        // console.log(avtRst);
        this.avatars = avtRst.shuffle();
        // console.log(this.avatars);
        // 座位mark位置
        let avtMarkPos = [{x: 10, y: 630}, {x: 10, y: 430}, {x: 10, y: 230}, {x: 180, y: 30}, {x: 350, y: 30},
            {x: 520, y: 230}, {x: 520, y: 430}, {x: 520, y: 630}, {x: 265, y: 800}];
        // 头像位置
        let avtPos = [{x: 65, y: 250}, {x: 65, y: 550}, {x: 65, y: 850}, {x: 400, y: 100}, {x: 400, y: 200},
            {x: 400, y: 300}];
        // 随机名字
        let TempUsers = ['张三', '李四', '王五', '赵六', '老湿', '叫兽', '砖家', '蜀黍', '超人'].shuffle();
        // dealer位置
        let avtDealerPos=[{dx:110, dy:630},{dx:110, dy:430},{dx:110, dy:230},{dx:110, dy:630},{dx:230, dy:180},
            {dx:500, dy:230},{dx:500, dy:430},{dx:500, dy:630},{dx:265, dy:760}];
        // 手牌位置
        let handPos =[{x1:110,y1:705,x2:121,y2:703.5},{x1:110,y1:505,x2:121,y2:503.5},{x1:110,y1:305,x2:121,y2:303.5},
        {x1:280,y1:105,x2:291,y2:103.5},{x1:450,y1:105,x2:461,y2:103.5},
        {x1:520,y1:305,x2:531,y2:303.5},{x1:520,y1:505,x2:531,y2:503.5},{x1:520,y1:705,x2:531,y2:703.5},
        {x1:365,y1:875,x2:376,y2:873.5}];

        // let handx1 = this.add.sprite(365,875,'Cards', 'CardsBack/cardBack_blue2');
        // let handx2 = this.add.sprite(376,873.5,'Cards', 'CardsBack/cardBack_blue2');
        // handx1.scale={x:0.2, y:0.2};
        // handx1.anchor.setTo(0.5);
        // handx2.scale={x:0.2, y:0.2};
        // handx2.anchor.setTo(0.5);
        // handx2.angle = 10;

        // for(let i=0; i < 6; i++){
        //     let avatar = this.groupAvatar.create(avtPos[i].x, avtPos[i].y, 'Avatar', this.avatars.shift());
        //     avatar.anchor.setTo(0.5);
        //     // avatar.scale={x:0.2,y:0.2}
        // }

        // Dealer 起始位置
        this.dealerIndex = parseInt(getRandomNumber(0, 9));
        // 座位数组
        this.seats = [];
        // 循环创建座位
        for (let i = 0; i < avtMarkPos.length; i++) {
            // 头像阴影
            let avatarMark = this.groupSeat.create(avtMarkPos[i].x, avtMarkPos[i].y, 'avatarMark');
            // 头像
            let avatar = this.groupAvatar.create(avatarMark.width / 2, avatarMark.height / 2, 'Avatar', this.avatars.shift());
            // 手牌位置
            let handWidth = avatarMark.width;
            //  座位567 手牌放左侧
            if (i === 5 || i === 6 || i === 7){
                handWidth = avatarMark.width - 100;

            }
            // 手牌1
            let hand1 = this.groupSeat.create(handWidth, avatarMark.height/2, 'Cards', 'CardsBack/cardBack_blue2');
            hand1.scale={x:0.2, y:0.2};
            hand1.anchor.setTo(0.5);
            // 手牌2
            let hand2 = this.groupAvatar.create(handWidth + 11, avatarMark.height/2 - 1.5, 'Cards', 'CardsBack/cardBack_blue2');
            hand2.scale={x:0.2, y:0.2};
            hand2.anchor.setTo(0.5);
            // 手牌2 倾斜
            hand2.angle = 10;

            // console.log('DealerIndex:'+DealerIndex);
            // 如果座位数和dealer 相等就创建dealer
            if(i === this.dealerIndex) {
                let width = 100;
                if (i === 5 || i === 6 || i === 7) {
                    // console.log('In 5 6 7');
                    width = -30
                }
                // console.log(width);
                let dealer = this.groupAvatar.create(width, 0, 'Dealer');
                dealer.scale = {x:0.25, y:0.25};
                avatarMark.addChild(dealer);
            }
            // 用户名
            let userName = this.add.text(avatarMark.width / 2, 20, TempUsers.shift(), {
                font: "20px Arial",
                fill: "#ffffff"
            });
            // 用户钱
            let Money = this.add.text(avatarMark.width / 2, avatarMark.height - 10, i+1+'000', {
                font: "20px Arial",
                fill: "#ffffff"
            });
            // 设置居中
            avatar.anchor.setTo(0.5);
            userName.anchor.setTo(0.5);
            Money.anchor.setTo(0.5);

            // 想座位加入子成员
            avatarMark.addChild(avatar);
            avatarMark.addChild(userName);
            avatarMark.addChild(Money);
            avatarMark.addChild(hand1);
            avatarMark.addChild(hand2);
            // 加入座位数组
            this.seats.push(avatarMark);
        }
        console.log(this.seats);
        // console.log(this.seats);
        // this.dealer = this.add.sprite(110, 230, 'Dealer');
        // this.smallBlind = this.add.sprite(230,200,'SmallBlind');
        // this.bigBlind = this.add.sprite(400,200,'BigBlind');
        // this.dealer.scale = {x: 0.25, y: 0.25};
        // this.dealer.anchor.setTo(0.5);
        // this.smallBlind.scale={x:0.35, y:0.35};
        // this.smallBlind.anchor.setTo(0.5);
        // this.bigBlind.scale={x:0.35, y:0.35};
        // this.bigBlind.anchor.setTo(0.5);


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

    // filpTween: function (param) {
    //     console.log(param);
    //     this.cards.isFlipping = true;
    //     var tween = this.add.tween(this.cards.scale).to({x: 0, y: 1.2}, 200 / 2, Phaser.Easing.Linear.None);
    //     tween.start();
    //     tween.onComplete.add(this.filpBack, this, 'call filpBack')
    // },
    //
    // filpBack: function (param) {
    //     console.log(param);
    //     this.cards.frame = this.cards.frame + 10;
    //     var tween = this.add.tween(this.cards.scale).to({x: 1, y: 1}, 200 / 2, Phaser.Easing.Linear.None);
    //     tween.start();
    //     tween.onComplete.add(function () {
    //         this.cards.isFlipping = false;
    //     }, this)
    //
    // },

    handPlace: function (hand, timer, nextCard) {
        // 抽取动画
        let tween1 = this.add.tween(hand.card).to({x: 535, y: 310}, 200, Phaser.Easing.Linear.None);
        // 下发动画
        let tween2 = this.add.tween(hand.card).to({x: this.game.width / 2, y: 1000}, 500, Phaser.Easing.Linear.None);
        // 左平移
        let tween3 = this.add.tween(hand.card).to({
            x: this.game.width / 2 + hand.moveTo,
            y: 1000
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
                            x: 0.45,
                            y: 0.45
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