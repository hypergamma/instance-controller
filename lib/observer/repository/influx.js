'use strict'

var moment = require('moment');
var conf = require('./conf/influx.json');
const Influx = require('influx');

var nfunc = 'user_func';

const influxdb = new Influx.InfluxDB(conf.endpoint);
influxdb.schema = [
    {
        measurement: 'handler',
        fields: {
            num_invokes: Influx.FieldType.INTEGER,
            num_errors: Influx.FieldType.INTEGER,
            latency: Influx.FieldType.FLOAT
        },
        tags: [
            'funcname',
            'host'
        ]
    }
];

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

    var container_imgae = 'progrium/consul';
    var tnow = moment().utc().subtract(minute, 'minutes');
    var tnow_str = tnow.format();

    var query = `select mean(${resource}) from ${measurement} where container_image = '${container_imgae}' and time > '${tnow_str}' group by time(${minute}m)`;
    influxdb.query(query).then(datapoints => {
        result(datapoints[datapoints.length - 1]);
    });
}


module.exports = influx;