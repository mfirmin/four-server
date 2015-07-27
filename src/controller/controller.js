/*
 * controller.js
 * -------------
 * Author: mfirmin @ github
 * Date: Jul 26 2015
 * 
 * Description: Input: world state, Output: control torques
 *
*/

function Controller() {

    this.entities = {};
    this.joints = {};
}


Controller.prototype.constructor = Controller;

Controller.prototype.initialize = function() {

}

Controller.prototype.setFromJSON = function(data) {

}

module.exports = Controller;
