
var THREE = require('../lib/three.min.js');

function Entity(name, opts) {

    this.name = name;

    this.position = new THREE.Vector3();
    this.rotation = new THREE.Quaternion();
    this.mesh = null;

    this.opts = (opts === undefined) ? {} : opts;

    this.initialize();

}


Entity.prototype.constructor = Entity;

Entity.prototype.initialize = function() {

}

Entity.prototype.setPosition = function(xyz) {
    this.mesh.position.x = xyz[0];
    this.mesh.position.y = xyz[1];
    this.mesh.position.z = xyz[2];
}
Entity.prototype.setRotation = function(q) {
    /*
    this.mesh.position.x = xyz[0];
    this.mesh.position.y = xyz[0];
    this.mesh.position.z = xyz[0];
    this.mesh.position.q = xyz[0];
    */
}

Entity.prototype.getPosition = function() {
    return this.position;
}
Entity.prototype.getRotation = function() {
    return this.rotation;
}

module.exports = Entity;
