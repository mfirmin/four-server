

var $     = require('jquery');
var io    = require('./lib/socketio');
var World = require('./world/world');
var Box   = require('./entity/box');

console.log('http://' + document.domain + ':' + location.port);

var socket = io.connect('http://' + document.domain + ':' + location.port);


var worlds = {};

socket.on('connect', function() {
        socket.emit('event_connect', {data: 'I\'m connected'});
});

socket.on('frame', function(msg) {
    jsonmsg = JSON.parse(msg);
    var world = worlds[jsonmsg.name];
    world.setFromJSON(jsonmsg);
    world.renderer.render(world.scene, world.camera);
    world.renderReady = true;
});

socket.on('init', function(msg) {
    jsonmsg = JSON.parse(msg);
    var world = new World('default');

    world.populateFromJSON(jsonmsg);

    worlds[world.name] = world;

    world.renderReady = true;

    var renderLoop = function() {
        if (world.renderReady) {
            world.renderReady = false;
            socket.emit('requestFrame', world.name);
        }
        if (!(this.paused)) { setTimeout(renderLoop, 1000/30); }
    }.bind(this)

    renderLoop();

//        world.go();
});


$(document).ready(function() {
    $('button').click(function(){
        console.log('reset default');
        socket.emit('reset', 'default');
    });
});

socket.emit('init', 'default');
            
/*
    setInterval(function() {
        socket.emit('requestframe', {'data': 'nothing'});
    }, 1000./30.);
    */
    
