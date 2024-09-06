var express = require('express');
var router = express.Router();

const AUTH_ROUTER = require('./auth');
const USER_ROUTER = require('./user');

router.use('/auth', AUTH_ROUTER);
router.use('/user', USER_ROUTER);

module.exports = router;