// This enables to run it in a browser or nwjs
var global = global || { 'nwjs': false };

if(global.nwjs != false){
  global.window = window;
  global.gui = require('nw.gui');
  TouchServer.startServer();
}

// Angular App

GAME_APP_NAME = 'GameApp';

(function(){
  'use strict'
  var app = angular.module(GAME_APP_NAME, []);
  global.isSplash = true;
})();
