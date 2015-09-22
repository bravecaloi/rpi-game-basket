(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.service('FruitService', function() {

    /**
     * Animates a fruit across the screen
     */
    var animateFruit = function(fruit, speed, callback){
      fruit.elem.style['-webkit-animation-name'] = 'moveit';
      fruit.elem.style['-webkit-animation-duration'] = speed + 's';
      fruit.elem.style['display'] = 'block';

      fruit.elem.addEventListener('webkitAnimationEnd', function(){
        callback(fruit);
      }, false);
    }

    /**
     * Creates a new div .note and appends it
     * to the #song element
     */
    var createFruit = function(index, delay, column) {
      // <div class="fruit"></div>
      var elem = document.createElement('div');
      elem.id = column.id + 'fruit' + index;
      elem.className = 'animated-fruit fruit';

      column.appendChild(elem);

      return {
        'elem':   elem,
        'column': column,
        'hit':    false,
        'delay':  delay
      }
    };

    /**
     * Verifies if an element is overlapping with
     * the threashold
     */
    var overlapsThreshold = function(elem1, elem2) {
      var fruit = elem1.getBoundingClientRect();
      var threshold = elem2.getBoundingClientRect();

      // If some is false, then there is no overlapping
      return !(
        threshold.top > fruit.bottom ||
        threshold.right < fruit.left ||
        threshold.bottom < fruit.top ||
        threshold.left > fruit.right
      );
    }


    /**
     * Available Methods
     */
    return {
      createFruit: createFruit,
      overlapsThreshold: overlapsThreshold,
      animateFruit: animateFruit
    };

  });

})();
