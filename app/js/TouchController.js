exports.touched = function(req, res) {
  var key = Number(req.params.number);

  switch (key) {

    //Music notes
    case 00:
    case 01:
    case 02:
    case 03:
    case 04:
    case 05:
    case 06:
      global.GameController.checkFruitsPosition(key);
      break;

    // Change instruments sounds and TODO: starts song (TBD)
    case 07:
    case 08:
    case 09:
    case 10:
      global.NotificationsService.changeInstrument(key);
      global.GameController.startSong();
      break;

    // Scrolls the song up (loops)
    case 11:
      global.GameController.scrollUpSong();
      break;

    default:
      console.log('No key definition for ' + key);
  }

  res.send('OK');
};
