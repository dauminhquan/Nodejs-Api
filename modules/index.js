module.exports = {
    goToLogin : async function (page,user,password){
        await page.open('https://mbasic.facebook.com/login')
        await page.evaluate(function (user,password) {
            document.querySelector("[name='email']").value = user;
            document.querySelector("[name='pass']").value = password;
            document.querySelector("[name='login']").click()
        },user,password);
    },
    postStatus:  async function(page,status){
        await page.evaluate(function (status) {
            document.querySelector("[name='xc_message']").value = status
            document.querySelector("[name='view_post']").click()
        },status)
    },
    sendMessageToUser:  async function (page,userId){
        await page.open(`https://mbasic.facebook.com/messages/thread/${userId}`)
        await setTimeout(async function () {
            await page.evaluate(function () {
                document.querySelector("[name='body']").value = "Tôi đang test tool----------"+ (new Date()).getTime().toString()
                document.querySelector("[name='send']").click()
            })
            page.status = "done"
        },2000)
    },
    goToHome: async function(page){
        page.open('https://mbasic.facebook.com')
    },
    goToFriendRequest: async function(page){
        page.open('https://mbasic.facebook.com/friends/center/requests')
    },
    acceptFriend: async function(page){
        await page.evaluate(function () {
            var nodesData = document.getElementsByClassName("y ba bq br bc z")
            for(var i = 0 ;i < nodesData.length;i++)
            {
                page.open("https://mbasic.facebook.com"+nodesData[i].href)
            }
        });
    },
    goToSearchFriend: async function(page,query){
        query = query.replace(/ /g,"+")
        await page.open(`https://mbasic.facebook.com/friends/center/search/?q=${query}`);
    },
    addFriendSearch: async function(page){
        await page.evaluate(function () {
            var nodesData = document.getElementsByClassName("y ba cg ch bc z")
            for(var i = 0 ;i < nodesData.length;i++)
            {
                console.log(nodesData[i].href)
                window.open(nodesData[i].href,"_blank")
                // page.open("https://mbasic.facebook.com"+nodesData[i].href)
            }
        });
    },
    goToFriendPage: async function(page){
        await page.open(`https://mbasic.facebook.com/profile.php?v=friends`);
    },
    updateListFriend: async function(page){
        await page.evaluate(function (user,password) {
            let friends = document.getElementsByClassName('cd')
            
            document.getElementById('m_more_friends')
            document.querySelector("[name='email']").value = user;
            document.querySelector("[name='pass']").value = password;
            document.querySelector("[name='login']").click()
        },user,password);
    }
}
