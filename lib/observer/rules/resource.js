'use strict'
var threshold = require('./conf/thresholds.json');

var resource = {
    IsCpuUsageCritical: IsCpuUsageCritical,
    IsCpuUsageTooLow: IsCpuUsageTooLow,

    IsMemoryUsageCritical: IsMemoryUsageCritical,
    IsMemoryUsageTooLow: IsMemoryUsageTooLow
};

function IsCpuUsageCritical(cpu_usage) {
    if (cpu_usage > threshold.resource.cpu_usage.max) return true;
    else return false;

}

function IsCpuUsageTooLow(cpu_usage) {
    if (cpu_usage < threshold.resource.cpu_usage.min) return true;
    else return false;
}

function IsMemoryUsageCritical(mem_usage) {
    if (mem_usage > threshold.resource.mem_usage.max) return true;
    return false;
}

function IsMemoryUsageTooLow(mem_usage) {
    if (mem_usage < threshold.resource.mem_usage.min) return true;
    else return false;
}

module.exports = resource;