'use strict'

var redis = require("redis");
var conf = require("./conf/redis.json");

var registry = {
    setFunctionEndpoint: setFunctionEndpoint,
    delFunctionEndpoint: delFunctionEndpoint
};

/**
 * Set the new function endpoint.
 * @param nuser     사용자명
 * @param nfunc     함수명
 * @param endpoint  function swarm 의 endpoint
 * @param result    결과 callback
 */
function setFunctionEndpoint(nuser, nfunc, endpoint, result) {
    var client = redis.createClient(conf);

    client.on("error", function (err) {
        //"RegistryAccessError"
        result(err);
    });

    var key = nuser + ":" + nfunc;
    client.set(key, endpoint,  function (err, res) {
        //"RegistrySetMethodError"
        if (err) result(err);
        else result(res);
    });
};

/**
 * Delete the function endpoint.
 * @param nuser     사용자명
 * @param nfunc     함수명
 * @param result    결과 callback
 */
function delFunctionEndpoint(nuser, nfunc, result) {
    var client = redis.createClient(conf);

    client.on("error", function (err) {
        //"RegistryAccessError"
        result(err);
    });

    var key = nuser + ":" + nfunc;
    client.del(key, function (err, res) {
        if (err) result(err);
        else result(res);
    });

};

module.exports = registry;