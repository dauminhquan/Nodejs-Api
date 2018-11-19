var express = require('express');
var router = express.Router();
const User = require('../../model/User')
const { check, validationResult } = require('express-validator/check');
router.post('/profile',(req,res,next) => {
    let user = req.user
    return res.json(user)
})
router.get('/accounts',(req,res,next) =>{
    let limit = parseInt(req.query.limit)
    let page = parseInt(req.query.page)
    let accounts = req.user.accounts
    let data = accounts.filter((account,index) => {
        if(index >= (page -1 ) * limit && index <page * limit)
        {

            return account
        }
    })
    return res.json({
        data: data,
        total: accounts.length
    })
})
router.get('/accounts/:_id',(req,res,next) =>{
    let accounts = req.user.accounts
    let data = accounts.filter((account,index) => {
       return account._id.equals(req.params._id)
    })
    return res.json(data)
})
router.post('/accounts',[
    check('email').isEmail(),
    check('password').isAlphanumeric(),
],(req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let user = req.user
    user.accounts.push({
        email: req.body.email,
        password: req.body.password
    })
    user.save(function (err,user) {
        if(err)
        {
          return  res.status(407).json(err)
        }
        return res.json({
            email: req.body.email,
            password: req.body.password
        })
    })
})
module.exports = router;
