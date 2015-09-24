(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.service('MusicService', function($rootScope) {

    var gameMusic = document.getElementById('gameMusic');

    var restartMusic = function() {
      gameMusic.pause();
      gameMusic.currentTime = 0;
      gameMusic.play();
    }

    var fadeIn = function(){
      restartMusic();

      var fadeAudio = setInterval(function() {
        if (gameMusic.volume < 1) {
          gameMusic.volume += 0.1;
        }else{
          clearInterval(fadeAudio);
        }
      }, 200);
    }

    var fadeOut = function(){
      var fadeAudio = setInterval(function() {
        if (gameMusic.volume > 0.1) {
          gameMusic.volume -= 0.1;
        }else{
          clearInterval(fadeAudio);
        }
      }, 400);
    }


    return {
      fadeIn: fadeIn,
      fadeOut: fadeOut
    };

  });

})();
