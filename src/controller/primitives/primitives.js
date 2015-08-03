/*
 * primitives.js
 * -------------
 * Author: mfirmin @ github
 * Date: Jul 26 2015
 * 
 * base primitive functions for calculating torques
 *
*/

// --- DEFAULTS --- //

var KP = 300;
var KD = 30;

function PDController(goal, kp, kd) {

    kp = (kp === undefined) ? KP : kp;
    kd = (kd === undefined) ? KD : kd;
    goal = (goal === undefined) ? 0 : goal;

    var c = function(angle, ang_vel) {

        this.kp = kp;
        this.kd = kd;
        this.goal = goal;

        angle = (angle === undefined) ? 0 : angle;
        ang_vel = (ang_vel === undefined) ? 0 : ang_vel;


        return kp*(angle - goal) - kd*ang_vel;
    }

    return c;
}

module.exports = {PDController: PDController};
