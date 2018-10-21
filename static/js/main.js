var width = window.innerWidth;
var height = window.innerHeight;
var gameRatio = window.innerWidth / window.innerHeight;
var firstRunLandscape;

function Length(obj) {
    var count = 0;
    for (var i in obj) {
        count++;
    }
    // return count - 1;
    return count;
};

var game = new Phaser.Game(width, height, Phaser.AUTO, '#game');
var LogBar;
var LogArray = new Array();
console.log('Width: ' + width);
console.log('Height: ' + height);

function handleIncorrect() {
    console.log('InCorrect');

    if (!game.device.desktop) {

        document.getElementById("turn").style.display = "block";

    }

}


function handleCorrect() {
    console.log('Correct');
    console.log(firstRunLandscape);
    game.scale.setGameSize(980,550);
    game.scale.refresh();

    if (!game.device.desktop) {

        // if (firstRunLandscape) {
        //
        //     gameRatio = window.innerWidth / window.innerHeight;
        //
        //     game.renderer.resize(980, 550);
        //
        //     game.state.start('created');
        //
        // }

        // game.renderer.resize(980, 550);
        // game.scale.refresh();
        // game.state.start('preload');
        document.getElementById("turn").style.display = "none";

    }

}

var states = {
    // init: function () {
    //     this.init = function () {
    //         game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //         game.scale.pageAlignHorizontally = true;
    //         game.scale.pageAlignVertically = true;
    //         game.scale.forceOrientation(true, false);
    //         game.scale.enterIncorrectOrientation.add(handleIncorrect);
    //         game.scale.leaveIncorrectOrientation.add(handleCorrect);
    //     }
    // },

    preload: function () {
        this.preload = function () {
            firstRunLandscape = game.scale.isGameLandscape;

            // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // game.scale.minWidth = 980;
            // game.scale.minHeight = 550;
            // game.scale.forceLandscape = true;

            // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.forceOrientation(true, false);
            game.scale.setScreenSize = true;
            game.scale.fullScreen = true;
            game.scale.enterIncorrectOrientation.add(handleIncorrect);
            game.scale.leaveIncorrectOrientation.add(handleCorrect);
            // game.stage.backgroundColor = '#eee';

            // 设置背景为黑色
            game.stage.backgroundColor = '#000000';
            // 加载游戏资源
            game.load.crossOrigin = 'anonymous';
            game.load.image('bg', '/static/images/bg.png');
            game.load.image('chip', '/static/images/chip-100.png');
            game.load.image('deskImg', '/static/images/desk.jpg');
            game.load.image('dizhu', '/static/images/dizhu.jpg');
            game.load.audio('bgMusic', '/static/audio/bg.mp3');
            game.load.audio('winMusic', '/static/audio/win.mp3');
            game.load.audio('loseMusic', '/static/audio/lose.mp3');
            // card audio
            game.load.audio('cardOpen1', '/static/audio/cardOpenPackage1.wav');
            game.load.audio('cardOpen2', '/static/audio/cardOpenPackage2.wav');
            game.load.audio('cardShuffle', '/static/audio/cardShuffle.wav');
            game.load.audio('cardFan1', '/static/audio/cardFan1.wav');
            game.load.audio('cardFan2', '/static/audio/cardFan2.wav');


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
            // if (!bgMusic) {
            bgMusic = game.add.audio('bgMusic');
            // bgMusic.loopFull();
            bgMusic.play();
            // }
            // if(bgMusic.isPlaying == false){
            //     bgMusic.play();
            // }

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
        var cardOpen1;
        var cardOpen2;
        var cardShuffle;
        var cardFan1;
        var cardFan2;
        var deskImg;
        this.create = function () {
            // 添加背景
            deskImg = game.add.image(0, 0, 'deskImg');
            deskImg.width = game.world.width;
            deskImg.height = game.world.height;


            // 添加提示
            // var remind = game.add.text(game.world.width - 100, game.world.height - 100, '游戏场景', {
            //     fontSize: '20px',
            //     fill: '#f2bb15'
            // });
            // remind.anchor.setTo(0.5, 0.5);

            cardOpen1 = game.add.audio('cardOpen1');
            cardOpen2 = game.add.audio('cardOpen2');
            cardShuffle = game.add.audio('cardShuffle');
            cardFan1 = game.add.audio('cardFan1');
            cardFan2 = game.add.audio('cardFan2');

            function audioPlay(audio, callback) {
                // console.log(audio);
                audio.play();
                callback;
            };

            function doNothing() {
                console.log('DoNoThing');
            }

            audioPlay(cardFan2,
                audioPlay(cardFan1,
                    audioPlay(cardShuffle,
                        audioPlay(cardOpen2,
                            audioPlay(cardOpen1,
                                doNothing)))));
            // cardOpen2.play();
            // cardShuffle.play();
            // cardFan1.play();
            // cardFan2.play();

            // 添加背景音乐
            // if (!winMusic) {
            //     winMusic = game.add.audio('winMusic');
            //     // winMusic.loopFull();
            //     winMusic.play();
            // }

            PyPoker.init();

            // 添加点击事件
            game.input.onTap.add(function () {
                game.state.start('over');
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
                loseMusic.play();
                // loseMusic.loopFull();
            }
            // 添加点击事件
            game.input.onTap.add(function () {
                game.state.start('created');
            });
        }
    }
};

// 添加场景到游戏示例中
Object.keys(states).map(function (key) {
    game.state.add(key, states[key]);
});

PyPoker = {

    socket: null,
    seats: [],
    seatUser: [],
    seatWidth: 120,
    seatHeight: 180,
    seatBmp: null,

    Game: {
        gameId: null,

        numCards: null,

        scoreCategories: null,

        getCurrentPlayerId: function () {
            return $('#current-player').attr('data-player-id');
        },

        setCard: function ($card, rank, suit) {
            $card.each(function () {
                x = 0;
                y = 0;

                if ($(this).hasClass('small')) {
                    url = "static/images/cards-small.png";
                    width = 24;
                    height = 40;
                }
                else if ($(this).hasClass('medium')) {
                    url = "static/images/cards-medium.png";
                    width = 45;
                    height = 75;
                }
                else {
                    url = "static/images/cards-large.png";
                    width = 75;
                    height = 125;
                }

                if (rank !== undefined || suit !== undefined) {
                    switch (suit) {
                        case 0:
                            // Spades
                            x -= width;
                            y -= height;
                            break;
                        case 1:
                            // Clubs
                            y -= height;
                            break;
                        case 2:
                            // Diamonds
                            x -= width;
                            break;
                        case 3:
                            // Hearts
                            break;
                        default:
                            throw "Invalid suit";
                    }

                    if (rank == 14) {
                        rank = 1;
                    }
                    else if (rank < 1 || rank > 13) {
                        throw "Invalid rank";
                    }

                    x -= (rank - 1) * 2 * width + width;
                }

                $(this).css('background-position', x + "px " + y + "px");
                $(this).css('background-image', 'url(' + url + ')');
            })
        },

        newGame: function (message) {
            PyPoker.Game.gameId = message.game_id;

            if (message.game_type == "traditional") {
                PyPoker.Game.numCards = 5;
                PyPoker.Game.scoreCategories = {
                    0: "Highest card",
                    1: "Pair",
                    2: "Double pair",
                    3: "Three of a kind",
                    4: "Straight",
                    5: "Full house",
                    6: "Flush",
                    7: "Four of a kind",
                    8: "Straight flush"
                };
            }
            else {
                PyPoker.Game.numCards = 2;
                PyPoker.Game.scoreCategories = {
                    0: "Highest card",
                    1: "Pair",
                    2: "Double pair",
                    3: "Three of a kind",
                    4: "Straight",
                    5: "Flush",
                    6: "Full house",
                    7: "Four of a kind",
                    8: "Straight flush"
                };
            }

            $('#game-wrapper').addClass(message.game_type);

            for (key in message.players) {
                playerId = message.players[key].id
                $player = $('#players .player[data-player-id=' + playerId + ']');
                $cards = $('.cards', $player);
                for (i = 0; i < PyPoker.Game.numCards; i++) {
                    $cards.append('<div class="card small" data-key="' + i + '"></div>');
                }

                if (playerId == message.dealer_id) {
                    $player.addClass('dealer');
                }
                if (playerId == PyPoker.Game.getCurrentPlayerId()) {
                    $player.addClass('current');
                }
            }
            $('#current-player').show();
        },

        gameOver: function (message) {
            $('.player').removeClass('fold');
            $('.player').removeClass('winner');
            $('.player').removeClass('looser');
            $('.player').removeClass('dealer');
            $('.player .cards').empty();
            $('#pots').empty();
            $('#shared-cards').empty();
            $('#players .player .bet-wrapper').empty();
            $('#current-player').hide();
        },

        updatePlayer: function (player) {
            $player = $('#players .player[data-player-id=' + player.id + ']');
            $('.player-money', $player).text('$' + parseInt(player.money));
            $('.player-name', $player).text(player.name);
        },

        playerFold: function (player) {
            $('#players .player[data-player-id=' + player.id + ']').addClass('fold');
        },

        updatePlayers: function (players) {
            for (k in players) {
                PyPoker.Game.updatePlayer(players[k]);
            }
        },

        updatePlayersBet: function (bets) {
            // Remove bets
            $('#players .player .bet-wrapper').empty();
            if (bets !== undefined) {
                for (playerId in bets) {
                    bet = parseInt(bets[playerId]);
                    if (bet > 0) {
                        $bet = $('<div class="bet"></div>');
                        $bet.text('$' + parseInt(bets[playerId]));
                        $('#players .player[data-player-id=' + playerId + '] .bet-wrapper').append($bet);
                    }
                }
            }
        },

        setPlayerCards: function (cards, $cards) {
            for (cardKey in cards) {
                $card = $('.card[data-key=' + cardKey + ']', $cards);
                PyPoker.Game.setCard(
                    $card,
                    cards[cardKey][0],
                    cards[cardKey][1]
                );
            }
        },

        updatePlayersCards: function (players) {
            for (playerId in players) {
                $cards = $('.player[data-player-id=' + playerId + '] .cards');
                PyPoker.Game.setPlayerCards(players[playerId].cards, $cards);
            }
        },

        updateCurrentPlayerCards: function (cards, score) {
            $cards = $('.player[data-player-id=' + PyPoker.Game.getCurrentPlayerId() + '] .cards');
            PyPoker.Game.setPlayerCards(cards, $cards);
            $('#current-player .cards .category').text(PyPoker.Game.scoreCategories[score.category]);
        },

        addSharedCards: function (cards) {
            for (cardKey in cards) {
                $card = $('<div class="card medium"></div>');
                PyPoker.Game.setCard($card, cards[cardKey][0], cards[cardKey][1]);
                $('#shared-cards').append($card);
            }
        },

        updatePots: function (pots) {
            $('#pots').empty();
            for (potIndex in pots) {
                $('#pots').append($(
                    '<div class="pot">' +
                    '$' + parseInt(pots[potIndex].money) +
                    '</div>'
                ));
            }
        },

        setWinners: function (pot) {
            $('#players .player').addClass('fold');
            $('#players .player').removeClass('winner');
            for (playerIdKey in pot.player_ids) {
                playerId = pot.player_ids[playerIdKey];

                $player = $('#players .player[data-player-id=' + playerId + ']');
                if (pot.winner_ids.indexOf(playerId) != -1) {
                    $player.removeClass('fold');
                    $player.addClass('winner');
                }
                else {
                    $player.addClass('fold');
                }
            }
        },

        changeCards: function (player, numCards) {
            $player = $('#players .player[data-player-id=' + player.id + ']');

            $cards = $('.card', $player).slice(-numCards);

            $cards.slideUp(1000).slideDown(1000);
        },

        onGameUpdate: function (message) {
            PyPoker.Player.resetControls();
            PyPoker.Player.resetTimers();

            switch (message.event) {
                case 'new-game':
                    PyPoker.Game.newGame(message);
                    break;
                case 'cards-assignment':
                    $cards = $('#current-player .cards');
                    $cards.empty();
                    for (i = 0; i < PyPoker.Game.numCards; i++) {
                        $cards.append($('<div class="card large" data-key="' + i + '"></div>'));
                    }
                    $('.card', $cards).click(function () {
                        if (PyPoker.Player.cardsChangeMode) {
                            $(this).toggleClass('selected');
                        }
                    });
                    PyPoker.Game.updateCurrentPlayerCards(message.cards, message.score);
                    break;
                case 'game-over':
                    PyPoker.Game.gameOver();
                    break;
                case 'fold':
                    PyPoker.Game.playerFold(message.player);
                    break;
                case 'bet':
                    PyPoker.Game.updatePlayer(message.player);
                    PyPoker.Game.updatePlayersBet(message.bets);
                    break;
                case 'pots-update':
                    PyPoker.Game.updatePlayers(message.players);
                    PyPoker.Game.updatePots(message.pots);
                    PyPoker.Game.updatePlayersBet();  // Reset the bets
                    break;
                case 'player-action':
                    PyPoker.Player.onPlayerAction(message);
                    break;
                case 'dead-player':
                    PyPoker.Game.playerFold(message.player);
                    break;
                case 'cards-change':
                    PyPoker.Game.changeCards(message.player, message.num_cards);
                    break;
                case 'shared-cards':
                    PyPoker.Game.addSharedCards(message.cards);
                    break;
                case 'winner-designation':
                    PyPoker.Game.updatePlayers(message.players);
                    PyPoker.Game.updatePots(message.pots);
                    PyPoker.Game.setWinners(message.pot);
                    break;
                case 'showdown':
                    PyPoker.Game.updatePlayersCards(message.players);
                    break;
            }
        }
    },

    Logger: {
        log: function (text) {
            $p0 = $('#game-status p[data-key="0"]');
            $p1 = $('#game-status p[data-key="1"]');
            $p2 = $('#game-status p[data-key="2"]');
            $p3 = $('#game-status p[data-key="3"]');
            $p4 = $('#game-status p[data-key="4"]');

            $p4.text($p3.text());
            $p3.text($p2.text());
            $p2.text($p1.text());
            $p1.text($p0.text());
            $p0.text(text);
        }
    },

    Player: {
        betMode: false,

        cardsChangeMode: false,

        resetTimers: function () {
            // Reset timers
            $activeTimers = $('.timer.active');
            $activeTimers.TimeCircles().destroy();
            $activeTimers.removeClass('active');
        },

        resetControls: function () {
            // Reset controls
            PyPoker.Player.setCardsChangeMode(false);
            PyPoker.Player.disableBetMode();
        },

        sliderHandler: function (value) {
            if (value == 0) {
                $('#bet-cmd').attr("value", "Check");
            }
            else {
                $('#bet-cmd').attr("value", "$" + parseInt(value));
            }
            $('#bet-input').val(value);
        },

        enableBetMode: function (message) {
            PyPoker.Player.betMode = true;

            if (!message.min_score || $('#current-player').data('allowed-to-bet')) {
                // Set-up slider
                $('#bet-input').slider({
                    'min': parseInt(message.min_bet),
                    'max': parseInt(message.max_bet),
                    'value': parseInt(message.min_bet),
                    'formatter': PyPoker.Player.sliderHandler
                }).slider('setValue', parseInt(message.min_bet));

                // Fold control
                if (message.min_score) {
                    $('#fold-cmd').val('Pass')
                        .removeClass('btn-danger')
                        .addClass('btn-warning');
                }
                else {
                    $('#fold-cmd').val('Fold')
                        .addClass('btn-danger')
                        .removeClass('btn-warning');
                }

                $('#fold-cmd-wrapper').show();
                $('#bet-input-wrapper').show();
                $('#bet-cmd-wrapper').show();
                $('#no-bet-cmd-wrapper').hide();
            }

            else {
                $('#fold-cmd-wrapper').hide();
                $('#bet-input-wrapper').hide();
                $('#bet-cmd-wrapper').hide();
                $('#no-bet-cmd-wrapper').show();
            }

            $('#bet-controls').show();
        },

        disableBetMode: function () {
            $('#bet-controls').hide();
        },

        setCardsChangeMode: function (changeMode) {
            PyPoker.Player.cardsChangeMode = changeMode;

            if (changeMode) {
                $('#cards-change-controls').show();
            }
            else {
                $('#cards-change-controls').hide();
                $('#current-player .card.selected').removeClass('selected');
            }
        },

        onPlayerAction: function (message) {
            isCurrentPlayer = message.player.id == $('#current-player').attr('data-player-id');

            switch (message.action) {
                case 'bet':
                    if (isCurrentPlayer) {
                        PyPoker.Player.onBet(message);
                    }
                    break;
                case 'cards-change':
                    if (isCurrentPlayer) {
                        PyPoker.Player.onChangeCards(message);
                    }
                    break;
            }

            timeout = (Date.parse(message.timeout_date) - Date.now()) / 1000;

            $timers = $('.player[data-player-id=' + message.player.id + '] .timer');
            $timers.data('timer', timeout);
            $timers.TimeCircles({
                "start": true,
                "animation": "smooth",
                "bg_width": 1,
                "fg_width": 0.05,
                "count_past_zero": false,
                "time": {
                    "Days": {show: false},
                    "Hours": {show: false},
                    "Minutes": {show: false},
                    "Seconds": {show: true}
                }
            });
            $timers.addClass('active');
        },

        onBet: function (message) {
            PyPoker.Player.enableBetMode(message);
            $("html, body").animate({scrollTop: $(document).height()}, "slow");
        },

        onChangeCards: function (message) {
            PyPoker.Player.setCardsChangeMode(true);
            $("html, body").animate({scrollTop: $(document).height()}, "slow");
        }
    },

    Room: {
        roomId: null,

        createPlayer: function (player = undefined) {
            if (player === undefined) {
                return $('<div class="player"><div class="player-info"></div></div>');
            }
            isCurrentPlayer = player.id == $('#current-player').attr('data-player-id');

            $playerName = $('<p class="player-name"></p>');
            $playerName.text(isCurrentPlayer ? 'You' : player.name);

            $playerMoney = $('<p class="player-money"></p>');
            $playerMoney.text('$' + parseInt(player.money));

            $playerInfo = $('<div class="player-info"></div>');
            $playerInfo.append($playerName);
            $playerInfo.append($playerMoney);

            $player = $('<div class="player' + (isCurrentPlayer ? ' current' : '') + '"></div>');
            $player.attr('data-player-id', player.id);
            $player.append($playerInfo);
            $player.append($('<div class="bet-wrapper"></div>'));
            $player.append($('<div class="cards"></div>'));
            $player.append($('<div class="timer"></div>'));

            return $player;
        },

        destroyRoom: function () {
            PyPoker.Game.gameOver();
            PyPoker.Room.roomId = null;
            $('#players').empty();
        },

        initRoom: function (message) {
            PyPoker.Room.roomId = message.room_id;
            // Initializing the room
            $('#players').empty();
            for (k in message.player_ids) {
                $seat = $('<div class="seat"></div>');
                $seat.attr('data-key', k);

                playerId = message.player_ids[k];

                if (playerId) {
                    // This seat is taken
                    $seat.append(PyPoker.Room.createPlayer(message.players[playerId]));
                    $seat.attr('data-player-id', playerId);
                }
                else {
                    $seat.append(PyPoker.Room.createPlayer());
                    $seat.attr('data-player-id', null);
                }
                $('#players').append($seat);
            }
        },

        onRoomUpdate: function (message) {
            if (PyPoker.Room.roomId == null) {
                PyPoker.Room.initRoom(message);
            }


            switch (message.event) {
                case 'player-added':
                    playerId = message.player_id;
                    player = message.players[playerId];
                    // var dizhu = game.add.sprite(this.seatWidth / 2, this.seatHeight / 2, 'dizhu');
                    // dizhu.alpha = 1;
                    // dizhu.anchor.setTo(0.5, 0.8);
                    // console.log(message.players);
                    var userLength = Length(message.players);
                    var count;
                    console.log('UserLength: ' + userLength);

                    for (count = 0; count < userLength; count++) {
                        var user_id = message.player_ids[count];
                        // console.log(count + user_id);
                        // console.log(message.players[user_id]);
                        var username = message.players[user_id].name;
                        var dizhu = game.add.sprite(this.seatWidth / 2, this.seatHeight / 2, 'dizhu');
                        dizhu.anchor.setTo(0.5, 0.8);
                        var uname = game.add.text(0, 0, username, {fontSize: '10px', fill: '#000000'});
                        uname.anchor.setTo(0.5, 0.);
                        PyPoker.seats[count].addChild(dizhu);
                        PyPoker.seats[count].addChild(uname);
                        PyPoker.seatUser[count] = user_id;
                        // console.log(PyPoker.seatUser);
                    }

                    playerName = playerId == $('#current-player').attr('data-player-id') ? 'You' : player.name;
                    // Go through every available seat, find the one where the new player should sat and seated him
                    $('.seat').each(function () {
                        seat = $(this).attr('data-key');
                        if (message.player_ids[seat] == playerId) {
                            $(this).empty();
                            $(this).append(PyPoker.Room.createPlayer(player));
                            $(this).attr('data-player-id', playerId);
                            return;
                        }
                    });
                    break;

                case 'player-removed':
                    playerId = message.player_id;
                    playerName = $('.player[data-player-id=' + playerId + '] .player-name').text();
                    // Go through every available seat, find the one where the leaving player sat and kick him out
                    var count;
                    for (count = 0; count < 5; count++) {
                        if (PyPoker.seatUser[count] == message.player_id) {
                            PyPoker.seats[count].childs
                        }
                    }
                    $('.seat').each(function () {
                        seatedPlayerId = $(this).attr('data-player-id');
                        if (seatedPlayerId == playerId) {
                            $(this).empty();
                            $(this).append(PyPoker.Room.createPlayer());
                            $(this).attr('data-player-id', null);
                            return;
                        }
                    });
                    break;
            }
        }
    },

    init: function () {
        LogBar = game.add.text(game.world.width - 100, game.world.height - 100, 'LogBar In Initial.', {
            fontSize: '20px',
            fill: '#f2bb15'
        });
        LogBar.anchor.setTo(0.5, 0.5);

        seatBmp = game.make.bitmapData(this.seatWidth, this.seatHeight);
        seatBmp.ctx.beginPath();
        seatBmp.ctx.rect(0, 0, this.seatWidth, this.seatHeight);
        seatBmp.ctx.fillStyle = '#ffffff';
        seatBmp.ctx.fill();
        this.seats = [];
        this.seats.push(game.add.sprite(width - 880, height - 400, seatBmp));
        this.seats.push(game.add.sprite(width - 880, height - 130, seatBmp));
        this.seats.push(game.add.sprite(width - 500, height - 130, seatBmp));
        this.seats.push(game.add.sprite(width - 100, height - 130, seatBmp));
        this.seats.push(game.add.sprite(width - 100, height - 400, seatBmp));

        var count;
        for (count = 0; count < this.seats.length; count++) {
            // console.log('In set SeatNum'+count);
            this.seats[count].anchor.setTo(0.5, 0.5);
            var seatNumber = game.add.text(0, 0, count + 1, {fontSize: '20px', fill: '#f2bb15'});
            this.seats[count].addChild(seatNumber);
        }
        // seat1 = game.add.sprite(game.world.width - 500,game.world.height - 200, seatBmp);
        // seat1 = game.add.sprite(game.world.width - 500,game.world.height - 200, seatBmp);

        // seat1 .anchor.setTo(0.5,0.5);
        // var dizhu = game.add.sprite(seatWidth/2,seatHeight/2,'dizhu');
        // dizhu.alpha = 1;
        // dizhu.anchor.setTo(0.5,0.8);

        // var graphics = game.add.graphics(0,0);
        // graphics.beginFill(0x3c77c0,1);
        // var seat1 = graphics.drawCircle(game.world.width - 800,game.world.height - 60,100);
        // var seat2 = graphics.drawCircle(game.world.width - 500,game.world.height - 60,100);
        // var seat3 = graphics.drawCircle(game.world.width - 200,game.world.height - 60,100);
        // var s1text = game.add.text(0,0,'Seat1', {fontSize: '20px', fill: '#f2bb15'});
        // dizhu.addChild(s1text);
        // seat1.addChild(s1text);
        // seat1.addChild(dizhu);


        wsScheme = window.location.protocol == "https:" ? "wss://" : "ws://";

        PyPoker.socket = new WebSocket(wsScheme + location.host + "/poker/texas-holdem");

        PyPoker.socket.onopen = function () {
            PyPoker.Logger.log('Connected :)');
            LogBar.setText('Connected:');
        };

        PyPoker.socket.onclose = function () {
            PyPoker.Logger.log('Disconnected :(');
            PyPoker.Room.destroyRoom();
        };


        PyPoker.socket.onmessage = function (message) {
            //console.log(message.data);
            var arrayBuffer;
            var fileReader = new FileReader();
            fileReader.readAsText(message.data, 'utf-8');
            fileReader.onload = function () {
                // console.info(fileReader.result);
                var data = JSON.parse(fileReader.result);
                var dataStr = JSON.stringify(fileReader.result);

                // console.log('In onmessage:');
                console.log(data);
                // LogArray.push(dataStr);
                // LogBar.setText(LogArray.toString());

                switch (data.message_type) {
                    case 'ping':
                        PyPoker.socket.send(JSON.stringify({'message_type': 'pong'}));
                        break;
                    case 'connect':
                        PyPoker.onConnect(data);
                        break;
                    case 'disconnect':
                        PyPoker.onDisconnect(data);
                        break;
                    case 'room-update':
                        PyPoker.Room.onRoomUpdate(data);
                        break;
                    case 'game-update':
                        PyPoker.Game.onGameUpdate(data);
                        break;
                    case 'error':
                        PyPoker.Logger.log(data.error);
                        break;
                }
            };


        };

        $('#cards-change-cmd').click(function () {
            discards = [];
            $('#current-player .card.selected').each(function () {
                discards.push($(this).data('key'))
            });
            PyPoker.socket.send(JSON.stringify({
                'message_type': 'cards-change',
                'cards': discards
            }));
            PyPoker.Player.setCardsChangeMode(false);
        });

        $('#fold-cmd').click(function () {
            PyPoker.socket.send(JSON.stringify({
                'message_type': 'bet',
                'bet': -1
            }));
            PyPoker.Player.disableBetMode();
        });

        $('#no-bet-cmd').click(function () {
            PyPoker.socket.send(JSON.stringify({
                'message_type': 'bet',
                'bet': 0
            }));
            PyPoker.Player.disableBetMode();
        });

        $('#bet-cmd').click(function () {
            PyPoker.socket.send(JSON.stringify({
                'message_type': 'bet',
                'bet': $('#bet-input').val()
            }));
            PyPoker.Player.disableBetMode();
        });

        PyPoker.Player.setCardsChangeMode(false);
        PyPoker.Player.disableBetMode();
    },

    onConnect: function (message) {
        PyPoker.Logger.log("Connection established with poker5 server: " + message.server_id);
        $('#current-player').attr('data-player-id', message.player.id);
    },

    onDisconnect: function (message) {

    },

    onError: function (message) {
        PyPoker.Logger.log(message.error);
    }
}

// 启动游戏
game.state.start('preload');

// window.addEventListener('resize', function () {  game.scale.refresh();});
// game.scale.refresh();