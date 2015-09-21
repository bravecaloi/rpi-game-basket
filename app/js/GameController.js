(function() {
  'use strict'

  var DELAY_UNIT_TIME = 1000;
  var FRUITS_PER_PLAYER = 3;
  var PLAYERS_NUMEBR = 2;
  var COLUMNS_PER_PLAYER = 4
  var PLAYER_0 = 0;
  var PLAYER_1 = 1;

  var app = angular.module(GAME_APP_NAME);

  app.controller('GameMechanicsController', function($scope, $timeout, FruitService, NotificationsService) {
    var ctrl = this;

    $scope.fruitsNumber = FRUITS_PER_PLAYER;

    var columns = [];

    var prepareElements = function(){
      for (var i = 0; i < PLAYERS_NUMEBR * COLUMNS_PER_PLAYER; i++) {
        columns.push({
          elem:   document.getElementById('column' + i ),
          points: document.getElementById('column' + i +'Points'),
          basket: document.getElementById('column' + i +'Basket'),
          fruits: []
        });
      }
    }

    var countGameEnds = 0;
    var fruitAnimationEnds = function(fruit) {
      fruit.elem.style.webkitAnimationName = '';
      fruit.elem.style['display'] = 'none';
      countGameEnds++;

      if(countGameEnds == PLAYERS_NUMEBR * FRUITS_PER_PLAYER){
        countGameEnds = 0;
        NotificationsService.callWinner();
      }
    }

    var createAllFruits = function() {
      for (var player = 0; player < PLAYERS_NUMEBR; player++) {

        for (var i = 0; i < FRUITS_PER_PLAYER; i++) {
          var column = getRandomColumn(player);
          var fruit = FruitService.createFruit(i, i, column.elem);
          column.fruits.push(fruit);

          $timeout(function(mFruit) {
            return function() {
              FruitService.animateFruit(mFruit, fruitAnimationEnds);
            };
          }(fruit), fruit.delay * DELAY_UNIT_TIME);
        }

      }
    }

    function getRandomColumn(player) {
      var min = player == PLAYER_0 ? 0 : 3;
      var max = player == PLAYER_0 ? 4 : 7;
      return columns[Math.floor(Math.random()*(max-min+1)+min)];
    }

    var resetGame = function() {
      for (var i = 0; i < columns.length; i++) {
        columns[i].elem.innerHTML = '';
        columns[i].fruits = [];
      }
      NotificationsService.resetPoints();
    }

    var startSong = function() {
      resetGame();
      createAllFruits();
    }

    var checkFruitsPosition = function(column) {
      var fruits = columns[column].fruits;
      var basket = columns[column].basket;
      var points = columns[column].points;

      animateElementOnce(basket, 'swing');

      for (var i = 0; i < fruits.length; i++) {
        var fruit = fruits[i];

        if (fruit.hit == false && FruitService.overlapsThreshold(fruit.elem, basket)) {
          fruit.hit = true;
          countGameEnds++;
          fruit.elem.style['display'] = 'none';
          NotificationsService.fruitHit(fruit, points, getPlayer(column));
          animateElementOnce(basket, 'active');
          return;
        }
      }
      NotificationsService.toneFailed(fruit, points);
    }

    function getPlayer(column){
      if(column < 4){
        return PLAYER_0;
      }
      return PLAYER_1;
    }

    function animateElementOnce(elem, animation) {
      elem.classList.add(animation);
      setTimeout(function() {
        elem.classList.remove(animation);
      }, 500);
    }

    /** Interface for the TouchController **/
    global.GameController = {
      startSong: startSong,
      checkFruitsPosition: checkFruitsPosition
    }

    prepareElements();

    return {
      startSong: startSong,
      checkFruitsPosition: checkFruitsPosition
    }
  });

})();
