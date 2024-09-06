const express = require('express');
const NOTIFICATION_CONTROLLER = require('../../../../controller/notification.controller');
const AUTH_CONTROLLER = require('../../../../controller/auth.controller');

const router = express.Router();

router.post('/register', async (req, res) => {
    await AUTH_CONTROLLER.register(req, res);
    NOTIFICATION_CONTROLLER.sendWelcomeNotification(req.body); // Kirim notifikasi setelah register
});

router.post('/login', AUTH_CONTROLLER.login);

module.exports = router;