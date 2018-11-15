var express = require('express');
var router = express.Router();
var phantom = require('phantom');
var moduleFacebookAuto = require('./../modules')
/* GET home page. */


router.get('/', async function(req, res, next) {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function(requestData) {
        console.info('Requesting', requestData.url);
    });
    const status = await page.open('https://mbasic.facebook.com/');
    const content = await page.property('content');
    await instance.exit();
    res.send(content)
});

// router.post('/post-to-facebook',async function (req,res,next) {
//
// })


router.get('/auto-post-facebook', async function(req,res,next){
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onConsoleMessage',  function(msg, lineNum, sourceId) {
        console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
    });
    await page.on('onResourceRequested', function(requestData) {
        console.info('Requesting', requestData.url);
    });
    const content = await page.property('content');
    await page.open('https://mbasic.facebook.com/').then(function (status) {
        page.evaluate(function(){
            console.log(document.getElementsByName("body"))
            var frm = document.getElementById("login_form");
            frm.elements["email"].value = "my.heart.osa.95@gmail.com";
            frm.elements["pass"].value = "minhquan";
            frm.submit();
        });
    });
    await instance.exit();
    res.send(content)
});

router.get('/post-status', async function(req, res, next) {
    var statusAction = {
        status: "gotoLogin"
    }
    let users = [
        {
            username : "pejemretkj_1542187832@tfbnw.net",
            password: "taikhoantest"
        },
        {
            username : "edtzilwxoz_1542187830@tfbnw.net",
            password: "taikhoantest"
        },{
            username : "grxfaiyfxh_1542187829@tfbnw.net",
            password: "taikhoantest"
        }
    ]
    for(let i = 0 ;i < users.length ; i++ )
    {
        await phantom.create(['--ignore-ssl-errors=yes','--load-images=no']).then(async function(ph) {
            await ph.createPage().then(async function(page) {
                await page.on('onConsoleMessage',  async function(msg, lineNum, sourceId) {
                    console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
                });
                await page.open('https://mbasic.facebook.com')
                await setTimeout(async function () {
                    await moduleFacebookAuto.goToLogin(page,users[i].username,users[i].password)
                    await page.render('login.png');
                    await setTimeout(async function () {
                        await page.render('waiting.png');
                        console.log("Đang ở trang đợi --- chuyen den trang home")
                        await moduleFacebookAuto.goToHome(page)
                        await setTimeout(async function () {
                            await page.render('home.png');
                            console.log("Đang ở trang home --- Dang post status")
                            await moduleFacebookAuto.postStatus(page)
                            await setTimeout(async function () {
                                await page.render('done.png');
                                console.log('Thành công')
                                var content = await page.property('content');
                                ph.exit()
                            },3000)
                        },5000)
                    },3000)
                },3000)
            })
        });
    }
    res.send("Thành công")


});

router.get('/add-friend',function (req,res,next) {
    phantom.create(['--ignore-ssl-errors=yes','--load-images=no']).then(async function(ph) {
        await ph.createPage().then(async function(page) {
            await page.on('onConsoleMessage',  async function(msg, lineNum, sourceId) {
                console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
            });
            await page.open('https://mbasic.facebook.com')
            await setTimeout(async function () {
                await moduleFacebookAuto.goToLogin(page)
                await page.render('login.png');
                await setTimeout(async function () {
                    await page.render('waiting.png');
                    console.log("Đang ở trang đợi --- chuyen den trang home")
                    await moduleFacebookAuto.goToFriendRequest(page)
                    await setTimeout(async function () {
                        await page.render('home.png');
                        console.log("Đang ở trang home --- Dang chap nhan yeu cau ket ban")
                        await moduleFacebookAuto.acceptFriend(page)
                        await setTimeout(async function () {
                            await page.render('done.png');
                            console.log('Thành công')
                            var content = await page.property('content');
                            ph.exit()
                            res.send(content)
                        },3000)
                    },5000)
                },3000)
            },3000)
        })
    });

})

router.get('/find-and-add-friend',function (req,res,next) {
    var query = req.param("name")
    console.log(query)
    phantom.create(['--ignore-ssl-errors=yes','--load-images=no']).then(async function(ph) {
        await ph.createPage().then(async function(page) {
            await page.on('onConsoleMessage',  async function(msg, lineNum, sourceId) {
                console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
            });
            await page.open('https://mbasic.facebook.com')
            await setTimeout(async function () {
                await moduleFacebookAuto.goToLogin(page)
                await page.render('login.png');
                await setTimeout(async function () {
                    await page.render('waiting.png');
                    console.log("Đang ở trang đợi --- chuyen den trang tìm kiếm")
                    await moduleFacebookAuto.goToSearchFriend(page,query)
                    await setTimeout(async function () {
                        await page.render('search.png');
                        console.log("Đang ở trang tìm kiếm --- Dang gui loi moi ket ban")
                        await moduleFacebookAuto.addFriendSearch(page)
                        await setTimeout(async function () {
                            await page.render('done.png');
                            console.log('Thành công')
                            var content = await page.property('content');
                            ph.exit()
                            res.send(content)
                        },3000)
                    },5000)
                },3000)
            },3000)
        })
    });

})


module.exports = router;
