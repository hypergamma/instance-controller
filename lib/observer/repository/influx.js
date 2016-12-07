'use strict'

var moment = require('moment');
var conf = require('./conf/influx.json');
const Influx = require('influx');
var func_imgname = process.env.FUNC_IMG_NAME;

const influxdb = new Influx.InfluxDB(conf.endpoint);

// influx repository
var influx = {
    getResourceUsage: getResourceUsage
};

/*

[resources]
usage_percent

[measurements]
docker_container_cpu
docker_container_mem

[container_image]
user defined function image name
progrium/consul
 */

function getResourceUsage(minute, resource, measurement, result) {

    var container_imgae = func_imgname;
    var tnow = moment().utc().subtract(minute, 'minutes');
    var tnow_str = tnow.format();

    var query = `select mean(${resource}) from ${measurement} where container_image = '${container_imgae}' and time > '${tnow_str}' group by time(${minute}m)`;
    influxdb.query(query).then(datapoints => {
        result(datapoints[datapoints.length - 1]);
    });
}

module.exports = influx;