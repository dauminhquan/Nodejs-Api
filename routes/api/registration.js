var express = require('express');
const { check, validationResult } = require('express-validator/check');
var router = express.Router();
const User = require('../../model/User')
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/',[
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
    check('password_confirm').isAlphanumeric()
],function(req,res,next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    },function(err,user) {
        if(err)
        {
            return res.status(500).json({
                errors: err
            })
        }
        return res.json(user)
    })
    /*User.findOne({
        email: req.body.email
    },'*',function (err,user) {
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
          return res.json(user)
    })*/

})
module.exports = router;
