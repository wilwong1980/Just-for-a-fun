var MyGame = MyGame || {};

MyGame.MainMenu = function () {
};

MyGame.MainMenu.prototype = {
    preload: function () {

    },

    create: function () {
        console.log('MainMenu state');
        // 总背景
        this.add.sprite(0, 80, 'bg0');
        // mask0
        // this.add.sprite(0, 80, 'mask0');
        // mask1
        // this.add.sprite(0, 80, 'mask1');
        // mask2
        this.add.sprite(0, 238, 'mask2');
        // 底部背景
        this.add.sprite(0, 398, 'bg1');
        // 左侧窗帘
        this.add.sprite(0, 80, 'curtain');
        // 右侧窗帘 左侧窗帘反转
        var curtain2 = this.add.sprite(644, 80, 'curtain');
        curtain2.width = -curtain2.width;
        // 云层， 介于总背景和底部背景直接
        var clound = this.add.tileSprite(0, 300, this.game.width, 200, 'clound');
        // 云层自动滚动
        clound.autoScroll(-30, 0);
        // 游戏名 title
        var name = this.add.sprite(20, 105, 'name');
        // 游戏名上下移动动画
        this.add.tween(name).to({y: 125}, 2500, null, true, 0, Number.MAX_VALUE, true);
        // 开始按钮
        var start = this.add.sprite(this.game.width / 2, 630, 'start0');
        start.anchor.setTo(0.5);
        // 开始按钮监听事件
        start.inputEnabled = true;
        // start.events.onInputDown.add(this.startGame, this);
        start.events.onInputDown.add(this.startGame, this);
        // 开始按钮伸缩动画
        var s = this.add.tween(start.scale);
        s.to({x: 1.02, y: 1.05}, 1500, Phaser.Easing.Linear.InOut, true, 0, Number.MAX_VALUE, true);
        // 开始按钮旋转动画
        var r = this.add.tween(start).to({angle: 360}, 1000, Phaser.Easing.Back.InOut, true, 3000);
        // 旋转重复
        r.repeat(Number.MAX_VALUE, 5000);
        // 账户余额底栏
        this.accoundBar = this.add.sprite(92.5, 750, 'accountBar');
        // 账户余额
        var money = this.add.text(this.accoundBar.width / 2, this.accoundBar.height / 2, '$1000', {
            font: "30px Arial",
            fill: "#ffffff"
        });
        money.anchor.setTo(0.5);
        // 余额作为子元素加入到余额底栏
        this.accoundBar.addChild(money);
        // 灯光精灵0
        var light0 = this.add.sprite(115, 78, 'light0');
        // 灯光精灵0 淡入淡出
        light0.alpha = 0;
        var l0 = this.add.tween(light0).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 350, true);
        l0.repeat(Number.MAX_VALUE, 6000);

        // 灯光精灵1
        var light1 = this.add.sprite(106, 80, 'light1');
        light1.alpha = 0;
        // 灯光精灵1 淡入淡出
        var l1 = this.add.tween(light1).to({alpha: 1}, 6000, Phaser.Easing.Linear.None, true, 0, 0, true);
        l1.repeat(Number.MAX_VALUE, 3000);
        var l1x = this.add.tween(light1).to({x: 120}, 6000, Phaser.Easing.Linear.None, true, 0, 0, true);
        l1x.repeat(Number.MAX_VALUE, 3000);
        // 灯光精灵2
        var light2 = this.add.sprite(350, 78, 'light2');

        // 灯光精灵2 淡入淡出并移动
        light2.alpha = 0;
        var l2 = this.add.tween(light2).to({alpha: 1}, 4000, Phaser.Easing.Linear.None, false, 0, 0, true);
        var l2x = this.add.tween(light2).to({x: 330}, 4000, Phaser.Easing.Linear.None, true, 0, 0, true);
        l2x.onRepeat.add(l2tween, this);

        function l2tween() {
            console.log('Call l2tween');
            l2.start();
        }

        l2x.repeat(Number.MAX_VALUE, 2000);

        // 雪茄精灵
        this.add.sprite(40, 900, 'cigar');
        // 雪茄烟雾
        var smoke = this.add.sprite(40, 900, 'smoke1');
        smoke.alpha = 0;
        var s = this.add.tween(smoke).to({alpha: 1}, 2000, Phaser.Easing.Linear.InOut, true, 0, 0, true);
        s.repeat(Number.MAX_VALUE, 1000);

        // 酒类精灵
        var wine0 = this.add.sprite(-200, 490, 'wine0');
        var wine1 = this.add.sprite(-200, 483, 'wine1');
        var wine2 = this.add.sprite(-200, 535, 'wine2');

        // winArray
         this.wineGroup = [wine0, wine1, wine2];
        // 酒类动画计数器
        this.wineCount = [0];
        // fadeIn 移动
        this.wineIn = {x: 70};
        // fadeOut 移动
        this.wineOut = {x: -200};
        // 定时器
        this.wineTimer = this.time.create(false);
        // 定时任务
        this.wineTimer.add(3000, this.fadeIn, this, this.wineGroup,this.wineCount, this.wineIn, this.wineOut, this.wineTimer, 10000);
        // 定时器启动
        this.wineTimer.start();


        // 餐巾精灵
        var napkin = this.add.sprite(545, 893, 'napkin');

        // chip组1 4个组合
        var chipGroupRed1 = this.add.group();
        var chipGroupGreen1 = this.add.group();
        var chipGroupBlue1 = this.add.group();
        var chipGroupBlack1 = this.add.group();

        // 向chip组1添加成员
        chipGroupRed1.create(630, 615, 'chipsRed');
        chipGroupRed1.create(675, 570, 'chipsRed');
        chipGroupRed1.create(695, 635, 'chipSMred');
        chipGroupRed1.create(735, 600, 'chipSMred');

        chipGroupGreen1.create(630, 615, 'chipsGreen');
        chipGroupGreen1.create(675, 570, 'chipsGreen');
        chipGroupGreen1.create(695, 635, 'chipSMgreen');
        chipGroupGreen1.create(735, 600, 'chipSMgreen');

        chipGroupBlue1.create(630, 615, 'chipsBlue');
        chipGroupBlue1.create(675, 570, 'chipsBlue');
        chipGroupBlue1.create(695, 635, 'chipSMblue');
        chipGroupBlue1.create(735, 600, 'chipSMblue');

        chipGroupBlack1.create(630, 615, 'chipsBlack');
        chipGroupBlack1.create(675, 570, 'chipsBlack');
        chipGroupBlack1.create(695, 635, 'chipSMblack');
        chipGroupBlack1.create(735, 600, 'chipSMblack');

        // chip组1准备定时事件及动画
        // array 成员
        this.chipsG1 = [chipGroupRed1, chipGroupGreen1, chipGroupBlack1, chipGroupBlue1];
        // 当前动画计数器
        this.chipsG1Count = [0];
        // fadeIn 移动
        this.chipsG1In = {x: -93};
        // fadeOut 移动
        this.chipsG1Out = {x: 650};
        // 定时器
        this.chipTimer1 = this.time.create(false);
        // 定时任务
        this.chipTimer1.add(2000, this.fadeIn, this, this.chipsG1,this.chipsG1Count, this.chipsG1In, this.chipsG1Out, this.chipTimer1, 7000);
        // 定时器启动
        this.chipTimer1.start();

        // chip组2 3个组合
        var chipGroupRed2 = this.add.group();
        var chipGroupGreen2 = this.add.group();
        var chipGroupBlue2 = this.add.group();
        var chipGroupBlack2 = this.add.group();

        // 向chip组2增加成员
        chipGroupRed2.create(-110, 675, 'chipsRed');
        chipGroupRed2.create(-55, 705, 'chipSMred');

        chipGroupGreen2.create(-110, 675, 'chipsGreen');
        chipGroupGreen2.create(-55, 705, 'chipSMgreen');

        chipGroupBlue2.create(-110, 675, 'chipsBlue');
        chipGroupBlue2.create(-55, 705, 'chipSMblue');

        chipGroupBlack2.create(-110, 675, 'chipsBlack');
        chipGroupBlack2.create(-55, 705, 'chipSMblack');

        // array 成员
        this.chipsG2 = [chipGroupBlue2, chipGroupBlack2, chipGroupRed2, chipGroupGreen2];
        // this.chipsG2 =[chipGroupRed2];
        // // chip组2 动画计数器
        this.chipsG2Count = [0];
        // // fadeIn 移动
        this.chipsG2In = {x: 100};
        // // fadeOut 移动
        this.chipsG2Out = {x: -110};
        // // 定时器
        this.chipTimer2 = this.time.create(false);
        // // 定时任务
        this.chipTimer2.add(1000, this.fadeIn, this, this.chipsG2, this.chipsG2Count, this.chipsG2In, this.chipsG2Out, this.chipTimer2, 3000);
        // // 定时器启动
        this.chipTimer2.start();


    },

    update: function () {

    },

    startGame: function () {
        this.state.start('Game');
    },

    // render: function () {
    //     this.debug = this.game.debug;
    //     this.game.debug.font = '40px monospace';
    //     this.game.debug.lineHeight = 30;
    //     this.debug.device(420, 200, '#62978a');
    //     this.debug.scale(0,0,'#62978a');
    // },

    fadeIn: function (target, count, In, Out, timer, timeContinue) {
        // console.log('fadeIn');
        this.add.tween(target[count[0]]).to(In, 1000, Phaser.Easing.Back.InOut, true, 0, 0);
        timer.add(timeContinue, this.fadeOut, this, target, count, In, Out, timer, timeContinue);
    },

    fadeOut: function (target, count, In, Out, timer, timeContinue) {
        // console.log('fadeOut');
        this.add.tween(target[count]).to(Out, 1000, Phaser.Easing.Back.InOut, true, 0, 0);
        timer.add(1000, this.fadeChange, this, target, count, In, Out, timer, timeContinue);
    },

    fadeChange: function (target, count, In, Out, timer, timeContinue) {
        // console.log('fadeChange');
        count[0]++;
        if (count[0] + 1 > target.length) {
            count[0] = 0
        }
        timer.add(1000, this.fadeIn, this, target, count, In, Out, timer, timeContinue);
    }
};