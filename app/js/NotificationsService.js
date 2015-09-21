(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.service('NotificationsService', function() {

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

    var resetPoints = function() {
      for (var i = 0; i < players.length; i++) {
        players[i].points.innerHTML = 0;
        players[i].winner.style['display'] = 'none';
      }
    }

    var callWinner = function(){
      var min = 0;
      var player = {};

      for (var i = 0; i < players.length; i++) {
        var points = Number(players[i].points.innerHTML);
        if(points > min){
          min = points;
          player = players[i];
        }
      }

      console.log(min);
      console.log(player);

      if(min > 0){
        player.winner.style['display'] = 'block';
      }
    }

    /**
     * Activated when a Fruit is correctly hit
     */
    var fruitHit = function(fruit, points, player) {
      animatePointsCounter('+1', points);
      players[player].points.innerHTML = Number(players[player].points.innerHTML) + 1;
    }

    /**
     * Activated when a fruit was missed
     */
    var fruitMissed = function(fruit, points) {
      animatePointsCounter('0', points);
    }


    /**
     * Activated when a note is played but no fruit is hit
     */
    var toneFailed = function(note) {
      // do nothing
    }


    /** Interface for the TouchController **/
    global.NotificationsService = {}


    /**
     * Available Methods
     */
    return {
      fruitHit: fruitHit,
      fruitMissed: fruitMissed,
      toneFailed: toneFailed,
      resetPoints: resetPoints,
      callWinner: callWinner
    };

  });

})();
