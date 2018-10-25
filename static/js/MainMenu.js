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
        console.log(light2.position);
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
        var wine0 = this.add.sprite(70, 490, 'wine0');
        // var wine1 = this.add.sprite(70, 483, 'wine1');
        // var wine2 = this.add.sprite(70, 535, 'wine2');

        // 餐巾精灵
        var napkin = this.add.sprite(545, 893, 'napkin');

        // chip组
        var chipGroupRed1 = this.add.group();
        var chipGroupGreen1 = this.add.group();
        var chipGroupBlue1 = this.add.group();
        var chipGroupBlack1 = this.add.group();

        var chipGroupRed2 = this.add.group();
        var chipGroupGreen2 = this.add.group();
        var chipGroupBlue2 = this.add.group();
        var chipGroupBlack2 = this.add.group();

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

        this.chipsG1 = [chipGroupRed1, chipGroupGreen1, chipGroupBlack1, chipGroupBlue1];
        this.chipsG1Count = [0];
        var chipsG1In = {x:-93};
        var chipsG1Out = {x: 650};
        this.chipTimer1 = this.time.create(false);
        this.chipTimer1.add(3000, this.chipIn, this, chipGroupRed1, chipsG1In);

        this.chipTimer1.start();


        // var cgr1In = this.add.tween(chipGroupRed1).to({x: -200}, 1000, Phaser.Easing.Back.InOut, true, 0, 0);
        // var cgr1Out = this.add.tween(chipGroupRed1).to({x: 650}, 1000, Phaser.Easing.Back.InOut, false, 0);
        // cgr1In.onRepeat.add(runout, this);

        // function runout() {
        //     cgr1Out.start();
        // }
        //
        // cgr1In.repeat(Number.MAX_VALUE, 5000);

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

    chipIn: function (chipGroup, to) {
        console.log(to);
        var tween = this.add.tween(chipGroup).to({x: -93}, 1000, Phaser.Easing.Back.InOut, true, 0, 0);
        this.chipTimer1.add(3000, this.chipOut, this, chipGroup);
    },

    chipOut: function (chipGroup) {
        var tween = this.add.tween(chipGroup).to({x: 650}, 1000, Phaser.Easing.Back.InOut, true, 0, 0);
        this.chipTimer1.add(2000, this.chipChange, this, this.chipsG1Count, this.chipsG1);
    },
    
    chipChange: function (count, chipsGroup) {
        count[0]++;
        if (count[0]+1 > chipsGroup.length){
            count[0] = 0
        }
        this.chipTimer1.add(3000, this.chipIn, this, chipsGroup[count]);
    }
};