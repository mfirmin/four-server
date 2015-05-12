
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

    var quat = new THREE.Quaternion();
    quat.x = q[1]//q[1];
    quat.y =q[2] //q[0];
    quat.z =q[3]// q[0];
    quat.w = q[0];
    quat.normalize();
    this.mesh.quaternion = quat;
    this.mesh.updateMatrix();

    console.log(this.mesh.matrix);
    
//    this.mesh.rotation.x = Math.PI/4.;
    
}

Entity.prototype.getPosition = function() {
    return this.position;
}
Entity.prototype.getRotation = function() {
    return this.rotation;
}

module.exports = Entity;
