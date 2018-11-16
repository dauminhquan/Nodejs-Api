var express = require('express');
var randtoken = require('rand-token');
const { check, validationResult } = require('express-validator/check');
var moment = require('moment');
var router = express.Router();
const User = require('../../model/User')
const Token = require('../../model/Token')
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/login',[
    check('email').isEmail(),
    check('password').isAlphanumeric(),
],function(req,res,next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    User.findOne({
        email: req.body.email
    },["email","name","password"],function (err,user) {
          if(err)
          {
            return res.status(406).json({
                errors: err
            })
          }
          if(user == null)
          {
              return res.status(406).json({
                  error: "Email is not exist"
              })
          }
          if(user.password != req.body.password)
          {
              return res.status(406).json({
                  error: "Password is not correct"
              })
          }
          let token = new Token({
                key : randtoken.generate(225),
                expired_date: moment().add(2, 'hours').format(),
              user_id : user._id
          })
        token.save(function (err) {
            if(err)
            {
                return res.status(406).json({
                    errors: err
                })
            }
            return res.json({
                user: user,
                token : token
            })
        })

    })

})
module.exports = router;
