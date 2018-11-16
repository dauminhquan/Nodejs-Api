const express = require('express');
const router = express.Router();
const authRouter = require('./auth')
const userRouter = require('./users')
const registrationRouter = require('./registration')
const Token = require('./../../model/Token')
const User = require('../../model/User')
const moment = require('moment')
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.use(authRouter)
router.use('/users',userRouter)
router.use('/registration',registrationRouter)

router.post('/profile',(req,res,next) => {
    let key = req.headers.authorization

    Token.findOne({key: key},["user_id","expired_date"],function(err,token) {
        if(err || token == null || moment(token.expired_date) < moment())
        {
          return res.status(406).json({
                error : "Not accept"
            })
        }
        User.findById(token.user_id,["email","password","name","avatar"],function(err, user) {
            if(err || user == null)
            {
                return res.status(406).json({
                    error : "Not accept"
                })
            }
            return res.json(user)
        })
    })

})
module.exports = router;
