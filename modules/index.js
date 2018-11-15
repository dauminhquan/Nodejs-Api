module.exports = {
    goToLogin : async function (page,user,password){

        await page.open('https://mbasic.facebook.com/login')
        await page.evaluate(function (user,password) {
            // console.log("hdsjahdkjasdhsa",string)
            document.querySelector("[name='email']").value = user;
            document.querySelector("[name='pass']").value = password;
            document.querySelector("[name='login']").click()
        },user,password);
    },
    postStatus:  async function(page){
        await page.evaluate(function () {
            document.querySelector("[name='xc_message']").value = "Hello----------"+ (new Date()).getTime().toString()
            document.querySelector("[name='view_post']").click()
        })
    },
    sendMessageToUser:  async function (page,userId){
        page.status = "waiting"
        await page.open(`https://mbasic.facebook.com/messages/thread/${userId}`)
        await setTimeout(async function () {
            await page.evaluate(function () {
                document.querySelector("[name='body']").value = "Tôi đang test tool----------"+ (new Date()).getTime().toString()
                document.querySelector("[name='send']").click()
            })
            page.status = "done"
        })
    },
    goToHome: async function(page){
        await setTimeout(function () {
            page.open('https://mbasic.facebook.com')
        },3000)
    },
    goToFriendRequest: async function(page){
        await setTimeout(function () {
            page.open('https://mbasic.facebook.com/friends/center/requests')
        },3000)
    },
    acceptFriend: async function(page){
        await setTimeout(async function () {
            await page.evaluate(function () {
                var nodesData = document.getElementsByClassName("y ba bq br bc z")
                // console.log("length: ",document.getElementsByClassName("y ba br bu bc z"))
                for(var i = 0 ;i < nodesData.length;i++)
                {
                    page.open("https://mbasic.facebook.com"+nodesData[i].href)
                    // nodesData[i].click()
                }
            });
        },3000)
    },
    goToSearchFriend: async function(page,query){
        query = query.replace(/ /g,"+")
        await setTimeout(async function () {
            await page.open(`https://mbasic.facebook.com/friends/center/search/?q=${query}`);
        },3000)
    },
    addFriendSearch: async function(page){
        await setTimeout(async function () {
            await page.evaluate(function () {
                var nodesData = document.getElementsByClassName("y ba cg ch bc z")
                for(var i = 0 ;i < nodesData.length;i++)
                {
                    console.log(nodesData[i].href)
                    window.open(nodesData[i].href,"_blank")
                    // page.open("https://mbasic.facebook.com"+nodesData[i].href)
                }
            });
        },3000)
    }
}
