

var THREE = require('../lib/three.min.js');

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
    this.camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 2000);
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
