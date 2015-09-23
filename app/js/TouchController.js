exports.touched = function(req, res) {

  global.watchdog = global.window.WATCHDOG_TIME * 1000;

  if(global.isSplash == true){
    global.window.location.href = 'app.html';
    setTimeout(function(){
      global.GameController.startSong();
    }, 1000);
    return;
  }

  var key = Number(req.params.number);

  switch (key) {

    // Column 1
    case 00:
    case 01:
    case 02:
    case 03:
    case 04:
    case 05:
    case 06:
    case 07:
      global.GameController.checkFruitsPosition(key);
      break;

    case 08:
      global.GameController.addFruit();
      break;
    case 09:
      global.GameController.removeFruit();
      break;

    case 10:
      global.GameController.loopSpeed();
      break;

    case 11:
      global.GameController.startSong();
      break;

    default:
      console.log('No key definition for ' + key);
  }

  res.send('OK');
};
