var express = require('express');
var exec = require('child_process').exec;

/** resolve root **/
var _scriptroot = __dirname.replace("/lib/controller/routes", "");
var _actionroot = _scriptroot + "/scripts/actions/";
var _dockerroot = _scriptroot + "/scripts/docker/gamma/";

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
var router = express.Router();
router.put('/control/function', function(req, res, next) {
    var body = req.body;
    var nuser = body.nuser;
    var nfunc = body.nfunc;
    var path = body.path;

    // 앞/뒤 '/' 제거
    path = (path[path.length - 1] == "/"
        ? path.slice(0, path.length - 1) : path);
    path = (path[0] == "/" ? path.slice(1, path.length) : path);

    var env = body.func_env || "node";
    var env_ver = body.func_env_ver || "7.2";

    var result = { message: "", code: 0, body: body };

    // validation
    if (path == null || typeof path == 'undefined' || path == "") {
        result.message = "wrong path";
        result.code = -1;
    } else if (nuser == null || typeof nuser == 'undefined' || nuser == "") {
        result.message = "wrong user";
        result.code = -2;
    } else if (nfunc == null || typeof nfunc == 'undefined' || nfunc == "") {
        result.message = "wrong function name";
        result.code = -3;
    }

    var imagename = body.nuser + "-" + body.nfunc;
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
            res.json(result);
    });

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
    res.json({ message: '함수 삭제', body: body });
});

module.exports = router;
