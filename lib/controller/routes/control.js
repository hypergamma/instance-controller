var express = require('express');

/**
 *  Create a new gamma function.
 *  Method: PUT
 *  URL:    /api/control/function
 *  Body:   nfunc:  function name
 *          nuser:  user name
 *          path:   path of user defined code
 */
var router = express.Router();
router.put('/control/function', function(req, res, next) {
    var body = req.body;
    res.json({ message: '신규 함수 생성', body: body });
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
