

var io    = require('./lib/socketio');
var World = require('./world/world');
var Box   = require('./entity/box');

console.log('http://' + document.domain + ':' + location.port);

var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function() {
        socket.emit('event_connect', {data: 'I\'m connected'});
});

socket.on('frame', function(msg) {
        jsonmsg = JSON.parse(msg);
});

socket.on('init', function(msg) {
        jsonmsg = JSON.parse(msg);
        var world = new World();

        console.log(jsonmsg);

        world.populateFromJSON(jsonmsg);
        world.go();
});

socket.emit('init', 'default');
            
/*
    setInterval(function() {
        socket.emit('requestframe', {'data': 'nothing'});
    }, 1000./30.);
    */
    
