var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const moment = require('moment')
const User = require('../../model/User')
const Token= require('../../model/Token')
router.use((req,res,next) => {
    let key = req.headers.authorization

    Token.findOne({key: key},["user_id","expired_date"],function(err,token) {
        if(err || token == null || moment(token.expired_date) < moment())
        {
            return res.status(406).json({
                error : "Not accept"
            })
        }
        User.findById(token.user_id,["email","password","name","avatar","accounts"],function(err, user) {
            if(err || user == null)
            {
                return res.status(406).json({
                    error : "Not accept"
                })
            }
            req.user = user
            return next()
        })
    })

})
router.use(userRouter)
module.exports = router;
