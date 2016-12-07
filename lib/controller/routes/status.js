var express = require('express');
var router = express.Router();

/**
 *  사용자가 등록한 gamma function 목록을 가져온다.
 *  Method: POST
 *  URL:    /api/status/instance
 *  Body:   nfunc: function name
 *          nuser: user name
 */
router.post('/status/function', function(req, res, next) {
    var body = req.body;

    var nuser = body.nuser;

    /*
    {
        "message": "OK",
        "result_data": {
            ""
        },
        "result_code": 0
    }
     */
    res.json({ message: '인스턴스 제거 성공.', result_code: 0 });
});


module.exports = router;