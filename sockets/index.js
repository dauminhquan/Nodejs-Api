let sockets = {};
var helper = require('../config/helper')
const phantom = require('phantom')
const moduleFacebookAuto = require('../modules/index')
const User = require('../model/User')
const Token= require('../model/Token')
const moment = require('moment')
sockets.init = server => {

    /*const joinGroup = require('./join-group');
    const pushGroup = require('./push-group');

    const OnlineUser = require('./online-user');*/

    const io = require('socket.io')(server);
    let online_users = [];

    io.on('connection', socket => {
        console.log("1 người vừa kết nối")
        socket.on('connect-to-server',function(data){
            console.log("1 người vừa login thành công")
            Token.findOne({key: data.token},["user_id","expired_date"],function(err,token) {
                if(err || token == null || moment(token.expired_date) < moment())
                {
                    return false
                }
                User.findById(token.user_id,["email","password","name","avatar","accounts"],function(err, user) {
                    if(err || user == null)
                    {
                        socket.emit("reject",{
                            token: "time-expired"
                        })
                        return false
                    }
                    let accounts = user.accounts
                    accounts.forEach(account => {
                        socket.on("post-status-"+account._id,() => {
                            console.log("đang online account: "+account.email)
                            phantom.create(['--ignore-ssl-errors=yes','--load-images=no']).then(async function(ph) {
                                await ph.createPage().then(async function(page) {
                                    socket.emit('action-'+account._id,{
                                        message: "Đã khởi tạo trình duyệt"
                                    })
                                    await page.on('onConsoleMessage',  async function(msg, lineNum, sourceId) {
                                        console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
                                    });
                                    await page.open('https://mbasic.facebook.com')
                                    setTimeout(async function () {
                                        await moduleFacebookAuto.goToLogin(page,account.email,account.password)
                                        setTimeout(async function () {
                                            socket.emit('action-'+account._id,{
                                                message: "Đã login thành công - Đang chuyển đến trang Home",
                                            })
                                            await moduleFacebookAuto.goToHome(page)
                                            setTimeout(function () {
                                                socket.emit('action-'+account._id,{
                                                    message: "Chuyển đến trang Home thành công",
                                                })
                                                moduleFacebookAuto.postStatus(page,"xin chào")
                                                setTimeout(function () {
                                                    socket.emit('action-'+account._id,{
                                                        message: "Đăng status thành công!",
                                                    })
                                                },3000)
                                            },3000)
                                        },3000)
                                    },3000)
                                })
                            });
                        })
                    })
                })
            })
        })


        socket.on('disconnect', () => {
            console.log("1 người vừa thoát")
        });
    });
};

module.exports = sockets;
