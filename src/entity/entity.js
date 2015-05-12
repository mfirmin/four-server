
var THREE = require('../lib/three.min.js');

function Entity(name, opts) {

    this.name = name;

    this.position = new THREE.Vector3();
    this.rotation = new THREE.Quaternion();
    this.mesh = null;

    this.opts = (opts === undefined) ? {} : opts;

    this.initialize();

    this.mesh.matrixAutoUpdate = false;

}


Entity.prototype.constructor = Entity;

Entity.prototype.initialize = function() {

}

Entity.prototype.setMfromQandP = function(q_in,p) {

    var q = {w: q_in[0], v: {x: q_in[1], y: q_in[2], z: q_in[3]}};
    var pos = {x: p[0], y: p[1], z: p[2]};

    var R = new Float32Array(9);
    var M = new Float32Array(16);
    R[0] = 1 - 2*q.v.y*q.v.y - 2*q.v.z*q.v.z; R[3] = 2*q.v.x*q.v.y - 2*q.v.z*q.w;     R[6] = 2*q.v.x*q.v.z + 2*q.v.y*q.w;
    R[1] = 2*q.v.x*q.v.y + 2*q.v.z*q.w;     R[4] = 1 - 2*q.v.x*q.v.x - 2*q.v.z*q.v.z; R[7] = 2*q.v.y*q.v.z - 2*q.v.x*q.w;
    R[2] = 2*q.v.x*q.v.z - 2*q.v.y*q.w;     R[5] = 2*q.v.y*q.v.z + 2*q.v.x*q.w;     R[8] = 1 - 2*q.v.x*q.v.x - 2*q.v.y*q.v.y;

    this.mesh.matrix.elements[0] = R[0]; this.mesh.matrix.elements[4] = R[3]; this.mesh.matrix.elements[8] =  R[6];  this.mesh.matrix.elements[12] = pos.x;
    this.mesh.matrix.elements[1] = R[1]; this.mesh.matrix.elements[5] = R[4]; this.mesh.matrix.elements[9] =  R[7];  this.mesh.matrix.elements[13] = pos.y;
    this.mesh.matrix.elements[2] = R[2]; this.mesh.matrix.elements[6] = R[5]; this.mesh.matrix.elements[10] = R[8];  this.mesh.matrix.elements[14] = pos.z;
    this.mesh.matrix.elements[3] = 0;    this.mesh.matrix.elements[7] = 0;    this.mesh.matrix.elements[11] = 0;     this.mesh.matrix.elements[15] = 1;

//    console.log(this.mesh.matrix);

}

Entity.prototype.setPosition = function(xyz) {
    this.mesh.position.x = xyz[0];
    this.mesh.position.y = xyz[1];
    this.mesh.position.z = xyz[2];

}
// TODO: Make this work.
Entity.prototype.setRotation = function(q) {
    /*

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
*/
    
}

Entity.prototype.getPosition = function() {
    return this.position;
}
Entity.prototype.getRotation = function() {
    return this.rotation;
}

module.exports = Entity;
