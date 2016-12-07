'use strict'
var restify = require('restify');
var conf = require('./conf/controller.json');
var client = restify.createJsonClient(conf);

var controller = {
    addInstanceToSwarm: addInstanceToSwarm,
    removeInstanceFromSwarm: removeInstanceFromSwarm
};

/**
 * Function swarm 에 instance 를 추가한다.
 * @param instanceid
 * @param swarmid
 * @param result
 */
function addInstanceToSwarm(instanceid, swarmid, result) {

};

/**
 * Function swarm 으로부터 instance 를 제거한다.
 * @param instanceid
 * @param swarmid
 * @param result
 */
function removeInstanceFromSwarm(instanceid, swarmid, result) {

};

client.get('/my/machines', function(err, req, res, obj) {

    console.log(JSON.stringify(obj, null, 2));
});

module.exports = controller;