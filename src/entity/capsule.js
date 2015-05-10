
var THREE = require('../lib/three.min.js');
var Entity = require('./entity');

function Capsule(name, radius, height, opts) {

    this.radius = radius;
    this.height = height;
    Entity.call(this, name, opts);
}


Capsule.prototype.constructor = Capsule;

Capsule.prototype.initialize = function() {

    var color = (this.opts.color === undefined) ? [130,130,130] : this.opts.color;
    var cstring = 'rgb(' + color[0] + ','+ color[1]  + ',' + color[2]  + ')';

    var geo = new THREE.CylinderGeometry(this.radius, this.height, 8, 1, true);

    var mat = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: cstring, specular: 0x030303, shininess: 10, shading: THREE.SmoothShading} );
    var mesh = new THREE.Mesh( geo , mat );

    this.mesh = mesh;

}

module.exports = Capsule;
