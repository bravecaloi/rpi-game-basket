(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.service('NotificationsService', function($rootScope) {

    var players = [{
      points: document.getElementById('player0Points'),
      winner: document.getElementById('win_player01')
    }, {
      points: document.getElementById('player1Points'),
      winner: document.getElementById('win_player02')
    }]

    function animatePointsCounter(str, elem) {
      elem.classList.add('bounceIn');
      elem.innerHTML = str;
      setTimeout(function() {
        elem.classList.remove('bounceIn');
      }, 500);
    }

    var startGameCounter = 3;
    var startGameCounterWatcher = undefined;
    function showStartGameCounter() {
      document.getElementById('game_counter').style['display'] = 'block';
      document.getElementById('win_player01').style['display'] = 'none';
      document.getElementById('win_player02').style['display'] = 'none';
      document.getElementById('game_counter').style['display'] = 'block';
      document.getElementById('game_counter_text').innerHTML = 'Empieza en ' + startGameCounter;
      if(startGameCounterWatcher != undefined){
        clearInterval(startGameCounterWatcher);
      }

      startGameCounterWatcher = setInterval(function(){
        if (startGameCounter == 0) {
          startGameCounter = 3;
          clearInterval(startGameCounterWatcher);
          document.getElementById('game_counter').style['display'] = 'none';
          startGameCounterWatcher = undefined;
          $rootScope.$broadcast('finishStartGameCounter');
        } else {
          document.getElementById('game_counter_text').innerHTML = 'Empieza en ' + --startGameCounter;
        }
      }, 600);
    }

    var resetPoints = function() {
      for (var i = 0; i < players.length; i++) {
        players[i].points.innerHTML = 0;
        players[i].winner.style['display'] = 'none';
      }
    }

    var callWinner = function() {
      var min = 0;
      var player = {};

      for (var i = 0; i < players.length; i++) {
        var points = Number(players[i].points.innerHTML);
        if (points > min) {
          min = points;
          player = players[i];
        }
      }
      if (min > 0) {
        player.winner.style['display'] = 'block';
      } else {
        document.getElementById('tie_players').style['display'] = 'block';
      }
      document.getElementById('press_start').style['display'] = 'block';
    }

    /**
     * Activated when a Fruit is correctly hit
     */
    var fruitHit = function(fruit, points, player) {
      animatePointsCounter('+1', points);
      players[player].points.innerHTML = Number(players[player].points.innerHTML) + 1;

      if (points.watcher != undefined) {
        clearTimeout(points.watcher);
      }
      points.watcher = setTimeout(function() {
        points.innerHTML = '';
      }, 1000);
    }

    /**
     * Activated when a fruit was missed
     */
    var fruitMissed = function(fruit, points) {
      // do nothing
      // points.innerHTML = '';
    }

    /**
     * Activated when a note is played but no fruit is hit
     */
    var toneFailed = function(note) {
      // do nothing
    }


    /** Interface for the TouchController **/
    global.NotificationsService = {}


    var linkKeyboard = function() {
      // if (global.nwjs == true) return;

      var baskets = 'qweruiop';

      document.onkeypress = function(e) {
        global.Watchdog.refresh();

        if(global.isSplash){
          global.Watchdog.hideSplash();
        }

        e = e || window.event;
        var key = e.keyCode || e.which;
        var keychar = String.fromCharCode(key);
        switch (keychar) {
          case 'q':
          case 'w':
          case 'e':
          case 'r':
          case 'u':
          case 'i':
          case 'o':
          case 'p':
            global.GameController.checkFruitsPosition(baskets.indexOf(keychar));
            break;
          case 'a':
            global.GameController.addFruit();
            break;
          case 's':
            global.GameController.removeFruit();
            break;
          case 'v':
            global.GameController.loopSpeed();
            break;
          case 'g':
            global.GameController.startSong();
            break;

          default:
        }
      };
    }

    /**
     * Available Methods
     */
    return {
      fruitHit: fruitHit,
      fruitMissed: fruitMissed,
      toneFailed: toneFailed,
      resetPoints: resetPoints,
      callWinner: callWinner,
      linkKeyboard: linkKeyboard,
      showStartGameCounter: showStartGameCounter
    };

  });

})();
