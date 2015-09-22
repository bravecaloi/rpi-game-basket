(function() {
  'use strict'

  var DELAY_UNIT_TIME = 1000;
  var PLAYERS_NUMEBR = 2;
  var COLUMNS_PER_PLAYER = 4
  var PLAYER_0 = 0;
  var PLAYER_1 = 1;

  var app = angular.module(GAME_APP_NAME);

  app.controller('GameMechanicsController', function($scope, $timeout, FruitService, NotificationsService) {
    var ctrl = this;

    $scope.fruitsPerPlayer = 20;

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

      if(countGameEnds == PLAYERS_NUMEBR * $scope.fruitsPerPlayer){
        countGameEnds = 0;
        NotificationsService.callWinner();
      }
    }

    var animateSquenceFruits = function(fruit){
      $timeout(function(mFruit) {
        return function() {
          FruitService.animateFruit(mFruit, fruitAnimationEnds);
        };
      }(fruit), fruit.delay * DELAY_UNIT_TIME);
    }

    var createAllFruits = function() {
      for (var player = 0; player < PLAYERS_NUMEBR; player++) {
        for (var i = 0; i < $scope.fruitsPerPlayer; i++) {
          var column = getRandomColumn(player);
          var fruit = FruitService.createFruit(i, i, column.elem);
          column.fruits.push(fruit);
          animateSquenceFruits(fruit);
        }
      }
    }

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    function getRandomColumn(player) {
      var min = player == PLAYER_0 ? 0 : 4;
      var max = player == PLAYER_0 ? 4 : 8;
      var col = Math.floor( Math.random() * (max - min) + min );
      return columns[col];
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

    var addFruit = function(){
      $scope.fruitsPerPlayer++;
      $scope.$apply();
    }

    var removeFruit = function(){
      if($scope.fruitsPerPlayer == 1) return;
      $scope.fruitsPerPlayer--;
      $scope.$apply();
    }

    /** Interface for the TouchController **/
    global.GameController = {
      startSong: startSong,
      checkFruitsPosition: checkFruitsPosition,
      addFruit: addFruit,
      removeFruit: removeFruit
    }

    prepareElements();
    NotificationsService.linkKeyboard();


    return {
      startSong: startSong,
      checkFruitsPosition: checkFruitsPosition,
      addFruit: addFruit,
      removeFruit: removeFruit
    }
  });

})();
