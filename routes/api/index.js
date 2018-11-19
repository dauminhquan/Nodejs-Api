const express = require('express');
const router = express.Router();
const authRouter = require('./auth')
const middleware = require('./middleware')
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.use(authRouter)
router.use(middleware)
module.exports = router;
