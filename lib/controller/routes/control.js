'user strict'
var registry = require('../repository/registry.js');
var express = require('express');
var router = express.Router();

/**
 *  Create a new gamma function.
 *  Method: PUT
 *  URL:    /api/control/function
 *  Body:   nfunc:  function name
 *          nuser:  user name
 *          path:   path of user defined code
 */
router.put('/control/function', function(req, res, next) {
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

    // TODO control-1 함수 생성을 위한 스크립트 생성 및 호출부 작성
    // TODO control-2 일련의 작업의 성공 여부 확인 후 결과 응답을 내보낼 것.
    /* 1. 신규 function Dockerfile 생성 */
    /* 2. 신규 function docker image 생성 및 private registry 에 push */
    /* 3. 신규 function swarm 생성 대상 instance 조회 */
    /* 4. 신규 function swarm 생성 및 실행 */

    // 신규 function swarm 생성 후 넘겨받는 master swarm endpoint
    var endpoint = {host:'localhost', port:8080};
    var endpoint_str = JSON.stringify(endpoint);

    /* 5. registry 에 endpoint 등록 */
    registry.setFunctionEndpoint(nuser, nfunc, endpoint_str, function(result) {
        if (result instanceof Error) {
            // error handling
        }
    });

    /* 6. function observer 생성 및 실행
         - 대상 instance 는 docker container가 적게 구동중인 instance 선택 (tsdb 조회)
    */

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
    /* 1. function Dockerfile 생성 */
    /* 2. function docker image 삭제 */
    /* 3. function swarm 중단 및 삭제 */
    /* 4. registry 의 endpoint 제거 */
    registry.delFunctionEndpoint(nuser, nfunc, function(result) {
        if (result instanceof Error) {
            // error handling
        }
    });

    /* 6. function observer instance 삭제
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
