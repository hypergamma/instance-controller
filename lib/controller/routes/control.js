'user strict'
var registry = require('../repository/registry.js');
var express = require('express');
var exec = require('child_process').exec;

/** resolve root **/
var _scriptroot = __dirname.replace("/lib/controller/routes", "");
var _actionroot = _scriptroot + "/scripts/actions/";
var _dockerroot = _scriptroot + "/scripts/docker/gamma/";

var router = express.Router();

/**
 *  Create a new gamma function.
 *  Method: PUT
 *  URL:    /api/control/function
 *  Body:   nfunc:  function name
 *          nuser:  user name
 *          path:   path of user defined code
 *          func_env: function environment (i.e. node)
 *          func_env_ver: function environment version (i.e 7.2)
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
    var imagename = nuser + "-" + nfunc;
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
    // TODO control-2 일련의 작업의 성공 여부 확인 후 결과 응답을 내보낼 것 (callback 처리)
    /* 1. 신규 function swarm 생성 대상 instance 조회 */
    /* 2. 신규 function swarm 생성 및 실행 */

    // 신규 function swarm 생성 후 넘겨받는 master endpoint
    var endpoint = 'http://127.0.0.1:8080/function/tuser/tfunc';

    // registry 에 endpoint 등록
    // =============================================================================
    registry.setFunctionEndpoint(nuser, nfunc, endpoint, function(result) {
        if (result instanceof Error) {
            // error handling
        }
    });

    /* 3. function observer 생성 및 실행
         - 대상 instance 는 docker container가 적게 구동중인 instance 선택 (tsdb 조회) */

    /*
    // 성공: 0, 실패: -1, 그 외 에러 코드 정의, 어떤 스크립트에서 실패 했는지에 따라
    {
        "message:": "함수 생성 성공.",
        "result_code": 0
    }
     */
    res.json({ message: '신규 함수 생성 성공.', result_code: 0 });
});

/**
 *  Delete a gamma function.
 *  Method: DELETE
 *  URL:    /api/control/function
 *  Body:   nfunc: function name
 *          nuser: user name
 */
router.delete('/control/function', function(req, res, next) {
    var body = req.body;
    var nfunc = body.nfunc;
    var nuser = body.nuser;
    var path = body.path;
    var func_env = body.func_env;
    var func_env_ver = body.func_env_ver;
    /*
     // req.body
     {
     "nuser": "user",
     "nfunc": "function",
     "path": "/path/to/function",
     "func_env": "node",
     "func_env_ver: "7.2"
     }
     */

    // TODO control-1 함수 삭제를 위한 스크립트 생성 및 호출부 작성
    /* 1. function docker image 삭제 */
    /* 2. function swarm 중단 및 삭제 */
    /* 3. registry 의 endpoint 제거 */
    registry.delFunctionEndpoint(nuser, nfunc, function(result) {
        if (result instanceof Error) {
            // error handling
        }
    });

    /* 4. function observer instance 삭제
     - 대상 instance 는 docker container가 적게 구동중인 instance 선택 (tsdb 조회)
     */

    res.json({ message: '함수 삭제 성공.', result_code: 0 });
});

/**
 *  Add a new instance on the exists swarm.
 *  Method: PUT
 *  URL:    /api/control/instance
 *  Body:   nfunc:  function name
 *          nuser:  user name
 *          path:   path of user defined code
 */
router.put('/control/instance', function(req, res, next) {
    var body = req.body;
    res.json({ message: '인스턴스 추가 성공.', result_code: 0 });
});

/**
 *  Remove a instance from swarm.
 *  Method: DELETE
 *  URL:    /api/control/instance
 *  Body:   nfunc: function name
 *          nuser: user name
 */
router.delete('/control/instance', function(req, res, next) {
    var body = req.body;
    res.json({ message: '인스턴스 제거 성공.', result_code: 0 });
});

module.exports = router;
