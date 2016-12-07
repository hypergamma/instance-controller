'user strict'
var registry = require('../repository/registry.js');
var express = require('express');
var exec = require('child_process').exec;

/** resolve root **/
var _actionroot = "../scripts/actions/";
var _dockerroot = "../scripts/docker/gamma/";

var router = express.Router();

var getImageName = function (user, func) {
    return "function_" + user + "_" + func;
};

/**
 *  신규 gamma function 을 생성한다.
 *  Method: PUT
 *  URL:    /api/control/function
 *  Body:   nfunc:  function name
 *          nuser:  user name
 *          path:   path of user defined code
 *          func_env: function environment (i.e. node)
 *          func_env_ver: function environment version (i.e 7.2)
 *          rcount: replica count
 *
 */
router.put('/control/function', function(req, res, next) {
    var body = req.body;
    /*
     {
         "nuser": "user",
         "nfunc": "function",
         "path": "/path/to/function",
         "func_env": "node",
         "func_env_ver: "7.2"
     }
     */
    var nuser = body.nuser;
    var nfunc = body.nfunc;
    var env = body.func_env || "node";
    var env_ver = body.func_env_ver || "7.2";
    var rcount = body.rcount || 3; //기본 3개
    var path = body.path;
    // 앞/뒤 '/' 제거
    path = (path[path.length - 1] == "/"
        ? path.slice(0, path.length - 1) : path);

    path = (path[0] == "/" ? path.slice(1, path.length) : path);

    // result
    var result = { message: "", code: 0, body: body };

    // validation
    if (path == null || typeof path == 'undefined' || path == "") {
        result.message = "wrong path";
        result.code = -1;
        res.json(result);
    } else if (nuser == null || typeof nuser == 'undefined' || nuser == "") {
        result.message = "wrong user";
        result.code = -2;
        res.json(result);
    } else if (nfunc == null || typeof nfunc == 'undefined' || nfunc == "") {
        result.message = "wrong function name";
        result.code = -3;
        res.json(result);
    }

    // 신규 function docker image 생성 및 private docker repo 에 push
    // =============================================================================
    // function_username_functionname
    var imagename = getImageName(nuser, nfunc);
    var dockerpath = _dockerroot + "function/";

    // ./build-image.sh image_name dockerfile_root code_path"
    var child = exec(_actionroot + "function/build-image.sh"
        + " " + imagename
        + " " + dockerpath
        + " " + path
        + " " + env
        + " " + env_ver
        , function (error, stdout, stderr) {
            if (error !== null) {
                result.message = "함수 생성 실패";
                result.error = error;
            } else {
                result.message = "함수 생성 성공";
            }
    });

    // TODO control-1 함수 생성을 위한 스크립트 생성 및 호출부 작성
    // TODO control-2 일련의 작업의 성공 여부 확인 후 결과 응답을 내보낼 것.

    /* 4. 신규 function swarm 생성 및 실행 */
    var swarm = exec(_actionroot + "swarm/swarm-create-service.sh"
        + " " + imagename // service name
        + " " + imagename // docker image
        + " " + replica_count
        , function (error, stdout, stderr) {
            if (error !== null) {
                result.message = "swarm 서비스 생성 실패";
                result.error = error;
            } else {
                result.message = "swarm 서비스 생성 성공";
            }
    });

    /* 5. swarm 에서 function observer 생성 및 실행 */

    /*
    // 성공: 0, 실패: -1, 그 외 에러 코드 정의, 어떤 스크립트에서 실패 했는지에 따라
    {
        "message:": "함수 생성 성공.",
        "result_code": 0
    }
     */
    res.json(result);
});

/**
 *  gamma function 을 삭제한다.
 *  Method: DELETE
 *  URL:    /api/control/function
 *  Body:   nfunc: function name
 *          nuser: user name
 */
router.delete('/control/function', function(req, res, next) {
    var body = req.body;
    var nfunc = body.nfunc;
    var nuser = body.nuser;

    // result
    var result = { message: '함수 삭제 성공.', code: 0, body: body };
    var imagename = getImageName(nuser, nfunc);

    // TODO control-1 함수 삭제를 위한 스크립트 생성 및 호출부 작성

    /* 2. function docker image 삭제 */

    /* 3. swarm 에서 function 삭제 */
    var swarm = exec(_actionroot + "swarm/swarm-remove-service.sh"
        + " " + imagename // service name
        + " " + imagename // docker image
        , function (error, stdout, stderr) {
            if (error !== null) {
                result.message = "swarm 서비스 삭제 실패";
                result.error = error;
            } else {
                result.message = "swarm 서비스 삭제 성공";
            }
    });

    /* 4. swarm 에서 function observer 중단 및 삭제 */

    res.json(result);
});

/**
 *  gamma function 의 replica 수를 조정한다.
 *  Method: PUT
 *  URL:    /api/control/function
 *  Body:   nfunc:  function name
 *          nuser:  user name
 *          path:   path of user defined code
 *          rcount: new replica count
 */
router.post('/control/function', function(req, res, next) {
    var body = req.body;
    var nfunc = body.nfunc;
    var nuser = body.nuser;
    var rcount = body.rcount || 3; //기본 3개

    // result
    var result = { message: 'replica 조정 성공.', code: 0, body: body };

    /* 1. 서비스의 replica 조정 */
    var swarm = exec(_actionroot + "swarm/swarm-update-replica.sh"
        + " " + imagename // service name
        + " " + rcount // replica count
        , function (error, stdout, stderr) {
            if (error !== null) {
                result.message = "swarm 서비스 조절 실패";
                result.error = error;
            } else {
                result.message = "swarm 서비스 조절 성공";
            }
    });

    res.json(result);
});


module.exports = router;
