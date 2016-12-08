'use strict'
var restify = require('restify-clients');
var conf = require('./conf/controller.json');
var client = restify.createJsonClient(conf);

// from env var
var nfunc = process.env.FUNC_NAME;
var nuser = process.env.USER_NAME;

var controller = {
    adjustFunctionReplica: adjustFunctionReplica,
    getFunctionReplica: getFunctionReplica
};

/**
 * Function 의 replica 를 조정한다.
 * @param replica   조정할 replica 수
 * @param result    callback
 */
function adjustFunctionReplica(replica, result) {
    var req_body = { nfunc: nfunc, nuser: nuser, rcount: replica };
    client.post('/api/control/function', req_body, (err, req, res, data) => {
        if(err) console.log(err);
        result(data);
    });
}

/**
 * Function 의 replica 를 조회한다.
 * @param result    callback
 */
function getFunctionReplica(result) {
    var req_body = { nfunc: nfunc, nuser: nuser };
    client.post('/api/status/function/replica', req_body, (err, req, res, data) => {
        if(err) console.log(err);
        result(data);
    });
}

module.exports = controller;