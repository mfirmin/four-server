

var THREE = require('../lib/three.min.js');

var Box      = require('../entity/box');
var Cylinder = require('../entity/cylinder');
var Sphere   = require('../entity/sphere');
var Capsule  = require('../entity/capsule');

function World() {

    this.initializeGL();
    this.initialize();
    this.initializeDiv();
    this.paused = true;

    this.entities = {};
}


World.prototype.constructor = World;

World.prototype.initializeGL = function() {
    try{
        this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
        this.renderType = 'webgl';
    }catch(e){
        try{
            this.renderer = new THREE.CanvasRenderer();
            this.renderType = 'canvas';
        }catch(e2){
            this.error = true;
            return;
        }
    }
    this.error = false;

    this.renderer.setClearColor(0xffffff, 1);
}

World.prototype.initialize = function() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1.25, 1.25, 2.5, 0, 1, 2000);
    this.scene.add(this.camera);
    this.light = new THREE.PointLight( 0xfffffa, 1, 0 );
    this.light.position.set( 1, 20, -20 );
    this.scene.add( this.light );

    this.camera.position.z = -100;
    this.camera.lookAt(new THREE.Vector3(0,0,0));

}

World.prototype.initializeDiv = function() {

    this.panel = $('<div>')
        .addClass('ThreePanel')
        .attr({tabindex:0})
        .css({
            position: 'absolute',
            width: 400,
            height: 400,
        });

    this.renderer.setSize(400,400);

    this.canvas = $(this.renderer.domElement).width(400).height(400).addClass("threeCanvas");
    $(this.panel).append(this.canvas);
    $('body').append(this.panel);
}

World.prototype.addEntity = function(e) {
    
    var name = e.name;
    if (name in this.entities) {
        console.error('Cannot add entity. Entity with name ' + name + 'already exists.');
        return -1;
    }

    this.entities[name] = e;

    this.scene.add(e.mesh);
}

World.prototype.populateFromJSON = function(data) {

    var entities = data.entities;
    for (var e in entities) {

        var name = e;
        var type = entities[e].type;
        var toAdd;
        switch (type) {
            case 'box':
                toAdd = new Box(name, entities[e].sides);
                break;
            case 'sphere':
                toAdd = new Sphere(name, entities[e].radius);
                break;
            case 'cylinder':
                toAdd = new Cylinder(name, entities[e].radius, entities[e].height);
                break;
            case 'capsule':
                toAdd = new Capsule(name, entities[e].radius, entities[e].height);
                break;
            default:
                toAdd = null;
                console.error('Unknown Entity: ' + name + ' with type: ' + type);
                break;
        }

        if (toAdd != null) {
            toAdd.setPosition(entities[e].pos);
            toAdd.setRotation(entities[e].rot);
            this.addEntity(toAdd);
        }

    }

    return;
}

World.prototype.go = function() {

    this.paused = false;

    var renderLoop = function() {
        this.renderer.render(this.scene, this.camera);
        if (!(this.paused)) { setTimeout(renderLoop, 1000/30); }
    }.bind(this)

    renderLoop();
}

module.exports = World;
