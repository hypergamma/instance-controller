var express = require('express');
var router = express.Router();

/**
 *  사용자가 등록한 gamma function 목록을 가져온다.
 *  Method: POST
 *  URL:    /api/status/function
 *  Body:   nfunc: function name
 *          nuser: user name
 */
router.post('/status/function', function(req, res, next) {
    var body = req.body;
    var nuser = body.nuser;

    var result_data = {};

    /*
    {
        "message": "OK",
        "result_data": {
            ""
        },
        "result_code": 0
    }
     */
    res.json({ message: '함수 리스트 조회 성공.', result_code: 0, result_data: result_data });
});

/**
 *  gamma function 의 replica 수를 가져온다.
 *  Method: GET
 *  URL:    /api/status/function/relpica
 *  Body:   nfunc: function name
 *          nuser: user name
 */
router.post('/status/function/replica', function(req, res, next) {
    var body = req.body;
    var nfunc = body.nfunc;
    var nuser = body.nuser;

    var service_name = `function_${nuser}_${nfunc}`;
    // result
    var result = { message: 'replica 조회 성공.', code: 0, body: body };

    /* 1. 서비스의 replica 조회 */
    var swarm = exec(_actionroot + "swarm/swarm-count-replica.sh"
        + " " + service_name // service name
        , function (error, stdout, stderr) {
            if (error !== null) {
                result.message = "replica 조회 실패.";
                result.error = error;
            } else {
                result.message = "replica 조회 실패.";
            }

            res.json(result);
        });
});


module.exports = router;