

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
        $('#echoResult').text(jsonmsg.rHand.pos[1]);
});

socket.on('init', function(msg) {
        jsonmsg = JSON.parse(msg);
        $('#echoResult').text(jsonmsg.entities.rHand.pos[0]);
        var world = new World();

        var box1 = new Box('box1', [1,1,1]);
        box1.setPosition([0,0,2]);
        
        world.addEntity(box1);
//        world.populateFromJSON(jsonmsg);
        world.go();
});

socket.emit('init', 'default');
            
/*
    setInterval(function() {
        socket.emit('requestframe', {'data': 'nothing'});
    }, 1000./30.);
    */
    
