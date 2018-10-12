var width = window.innerWidth;
var height = window.innerHeight;

var game = new Phaser.Game(width, height, Phaser.AUTO, '#game');

var states = {

    preload: function () {
        this.preload = function () {
            // 设置背景为黑色
            game.stage.backgroundColor = '#000000';
            // 加载游戏资源
            game.load.crossOrigin = 'anonymous';
            game.load.image('bg', '/static/images/bg.png');
            game.load.image('chip', '/static/images/chip-100.png');
            game.load.audio('bgMusic', '/static/audio/bg.mp3');
            game.load.audio('winMusic', '/static/audio/win.mp3');
            game.load.audio('loseMusic', '/static/audio/lose.mp3');

            // 添加进度文字
            var progressText = game.add.text(game.world.centerX, game.world.centerY + 90, '0%', {
                fontSize: '60px',
                fill: '#ffffff'
            });
            // 设置文字居中
            progressText.anchor.setTo(0.5, 0.5);
            // 监听加载完一个文件的事件
            game.load.onFileComplete.add(function (progress) {
                progressText.text = progress + '%';
            });
            // 监听加载完毕事件
            game.load.onLoadComplete.add(onLoad);
            // 最小展示时间为3秒
            var deadLine = false;
            setTimeout(function () {
                deadLine = true;
            }, 1500);

            // 加载完毕回调方法
            function onLoad() {
                var logo = game.add.image(game.world.centerX, game.world.centerY, 'chip');
                logo.anchor.setTo(0.5, 0.5);
                if (deadLine) {
                    // 已到达最小展示时间，可以进入下一个场景
                    game.state.start('created');
                } else {
                    // 还没有到最小展示时间，1秒后重试
                    setTimeout(onLoad, 1000);
                }
            }
        }
    },

    created: function () {
        var bgMusic;
        this.create = function () {
            // 添加背景
            var bg = game.add.image(0, 0, 'bg');
            bg.width = game.world.width;
            bg.height = game.world.height;
            // 添加背景音乐
            if (!bgMusic) {
                bgMusic = game.add.audio('bgMusic');
                bgMusic.loopFull();
            }
            // 添加提示
            var remind = game.add.text(game.world.width - 100, game.world.height - 100, '点击任意位置开始', {
                fontSize: '20px',
                fill: '#f2bb15'
            });
            remind.anchor.setTo(0.5, 0.5);
            // 添加点击事件
            game.input.onTap.add(function () {
                game.state.start('play');
                bgMusic.stop();
            });
        }
    },


    play: function () {
        var winMusic;
        this.create = function () {
            // 添加提示
            var remind = game.add.text(game.world.width - 100, game.world.height - 100, '游戏场景', {
                fontSize: '20px',
                fill: '#f2bb15'
            });
            remind.anchor.setTo(0.5, 0.5);

            // 添加背景音乐
            if (!winMusic) {
                winMusic = game.add.audio('winMusic');
                winMusic.loopFull();
            }

            // 添加点击事件
            game.input.onTap.add(function () {
                game.state.start('over');
                winMusic.stop();
            });
        }

    },

    over: function () {
        var loseMusic;
        this.create = function () {
            // 添加提示
            var remind = game.add.text(game.world.width - 100, game.world.height - 100, '结束场景', {
                fontSize: '20px',
                fill: '#f2bb15'
            });
            remind.anchor.setTo(0.5, 0.5);
            // 添加背景音乐
            if (!loseMusic) {
                loseMusic = game.add.audio('loseMusic');
                loseMusic.loopFull();
            }
            // 添加点击事件
            game.input.onTap.add(function () {
                game.state.start('created');
                loseMusic.stop();
            });
        }
    }
};

// 添加场景到游戏示例中
Object.keys(states).map(function (key) {
    game.state.add(key, states[key]);
});

// 启动游戏
game.state.start('preload');