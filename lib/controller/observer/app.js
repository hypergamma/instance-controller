'use strict'

var influx = require('./repository/influx.js');
var controller = require('./repository/controller.js');
var schedule = require('node-schedule');

// scheduling rules
var rule = new schedule.RecurrenceRule();
rule.second = [0,10,20,30,40,50];

// observer rules
var resource = require('./rules/resource.js');

// adjust flag
var on_adjust_replica = false;

// INITIAL SCHEDULING OBSERVER
// ------------------------------------------------------------------------------------
schedule.scheduleJob('observer', rule, checkFunctionResources);
//checkFunctionResources();

function checkFunctionResources() {
    console.log(`start time: ${new Date()}`);

    // 10초 동안의 cpu 사용률 평균을 가져온다.
    influx.getResourceUsage(10, 'cpu_usage_percent', result => {
        /*
         {
             "time": "2016-12-07T06:20:00.000Z",
             "mean": 10.2
         }
         */
        if (result && result.mean) {
            var mean_cpu_usage = result.mean;
            if (resource.IsCpuUsageCritical(mean_cpu_usage)) {
                IncreaseFunctionReplica();
            } else if (resource.IsCpuUsageTooLow(mean_cpu_usage)) {
                DecreaseFunctionReplica();
            }
        }
    });

    // 5분 동안의 memory 사용률 평균을 가져온다.
    /*
    influx.getResourceUsage(5 * 60, 'mem_usage_bytes', result => {

        var mean_mem_usage = result.mean;
        if (resource.IsMemoryUsageCritical(mean_mem_usage)) {
            IncreaseFunctionReplica();
        } else if (resource.IsMemoryUsageTooLow(mean_mem_usage)) {
            DecreaseFunctionReplica();
        }
    });
    */
}

/** replica 수를 기존의 2배수로 늘린다.
 *  이미 조정 중인 경우에는 무시한다.
 */
function IncreaseFunctionReplica() {
    if (!on_adjust_replica) {
        console.log("increase function replica.");
        on_adjust_replica = true; // replica 조정 시작

        controller.getFunctionReplica(result => {
            var replica = result.result_data.replica_count;
            var target_replica = replica * 2;

            adjustFunctionReplica(target_replica);
        });
    }
}

/** replica 수를 기존의 70% 로 줄인다.
 *  이미 조정 중인 경우에는 무시한다.
 */
function DecreaseFunctionReplica() {
    if (!on_adjust_replica) {
        console.log("decrease function replica.");
        on_adjust_replica = true; // replica 조정 시작

        controller.getFunctionReplica(result => {
            var replica = result.result_data.replica_count;
            var target_replica = Math.round(replica * 0.7);
            console.log(`current replica: ${replica}, target replica: ${target_replica}`);
            if (target_replica < replica)
                adjustFunctionReplica(target_replica);
            else
                rescheduleObserver();
        });
    }
}

// replica 수를 조정한다.
function adjustFunctionReplica(replica) {
    console.log("adjust replica: " + replica);
    controller.adjustFunctionReplica(replica, result => {
        // check result type is error
        rescheduleObserver();
        // error check
    });
}

// observer 를 다시 시작한다.
function rescheduleObserver() {
    console.log("reschedule observer.");
    on_adjust_replica = false; // replica adjust 종료.
}