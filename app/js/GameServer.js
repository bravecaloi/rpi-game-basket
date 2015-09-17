"use strict";

var game = {

  startServer: function(){

    /** Module dependencies */
    var http        = require('http')
      , path        = require('path')
      , express     = require('express')
      , touchCtrl   = require(path.join(process.cwd(), 'app/js', 'TouchController.js'))
      , app         = express()
    ;

    var options = { host: 'localhost', port: 2323 };

    // all environments
    app.set('port', process.env.PORT || 2323);
    // app.set('views', process.cwd() + '/views');
    app.set('view engine', 'ejs');
    app.use(require('stylus').middleware(path.join(process.cwd(), 'public')));
    app.use(express.static(path.join(process.cwd(), 'public')));

    // link controllers with routes
    app.get('/touched/:number', touchCtrl.touched);

    // start server for touch events
    http.createServer(app).listen(app.get('port'), function(err){
      console.log('server created');
    });

  }
};
