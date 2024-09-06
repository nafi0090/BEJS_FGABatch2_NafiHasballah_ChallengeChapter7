const USER_MODEL = require('../model/user.model');

async function index(req, res) {
    const result = await USER_MODEL.index();
    res.json({
        message: "GET user API",
        data: result
    });
}

module.exports = {
    index
}