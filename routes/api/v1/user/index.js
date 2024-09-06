var express = require('express');
var router = express.Router();
const USER_CONTROLLER = require('../../../../controller/user.controller');

router.get('/', USER_CONTROLLER.index);

module.exports = router;