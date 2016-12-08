'use strict'
var moment = require('moment');
var conf = require('./conf/influx.json');
const Influx = require('influx');

// from env var
var nfunc = process.env.FUNC_NAME;
var nuser = process.env.USER_NAME;

const influxdb = new Influx.InfluxDB(conf.endpoint);

// influx repository
var influx = {
    getResourceUsage: getResourceUsage
};

/*

[resources]
cpu_usage_percent
mem_usage_bytes

[measurements]
handler

[tags]
nuser
nfunc
host
 */

function getResourceUsage(minute, resource, result) {

    var tnow = moment().utc().subtract(minute, 'minutes');
    var tnow_str = tnow.format();

    var query = `select mean(${resource}) from handler where nuser = '${nuser}' and nfunc = '${nfunc}' and time > '${tnow_str}' group by time(${minute}m)`;
    influxdb.query(query).then(datapoints => {
        result(datapoints[datapoints.length - 1]);
    });
}

module.exports = influx;