
GAME_APP_NAME = 'GameApp';

DEFAULT_SONG = 0;
DEFAULT_INSTRUMENT = 07;

// In milliseconds
DELAY_UNIT_TIME = 700;

SONGS = [
  {
    'position': 0,
    'name': 'Feliz Cumpleaños',
    'notes': 'DO DO RE DO FA MI DO DO RE DO FA MI DO DO RE DO SOL FA DO DO RE DO FA MI',
    'times': '01 01 01 01 02 02 01 01 01 01 02 02 01 01 01 01 02 02 01 01 02 02 02 02'
  },
  {
    'position': 1,
    'name': 'Himno de la Alegría',
    'notes': 'RE DO FA MI DO DO RE DO FA MI DO DO DO DO'
  },
  {
    'position': 2,
    'name': 'Enter Sandman',
    'notes': 'FA MI DO DO RE DO FA MI DO DO RE DO DO DO RE DO FA '
  },
  {
    'position': 3,
    'name': 'Spagheti del rock',
    'notes': 'MI DO DO RE DO FA MI DO DO RE DO FA DO DO RE DO FA DO DO RE DO FA DO DO RE DO FA'
  },
  {
    'position': 4,
    'name': 'Chopin 1',
    'notes': 'DO DO RE DO FA MI DO DO RE'
  },
  {
    'position': 5,
    'name': 'Autoum Leaves',
    'notes': 'DO DO RE DO FA DO DO RE DO FA DO DO RE DO FA MI DO DO RE DO FA MI'
  },
];

TONES = ['DO','RE','MI','FA','SOL','LA','SI'];

FRUITS = {
  'DO': 'apple',
  'RE': 'orange',
  'MI': 'green_apple',
  'FA': 'peach',
  'SOL': 'pear',
  'LA': 'lemon',
  'SI': 'zapallito'
};

/**
 * Init the angular app
 */
(function(){
  'use strict'

  var app = angular.module(GAME_APP_NAME, []);

})();
