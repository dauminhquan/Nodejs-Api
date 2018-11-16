let sockets = {};
sockets.init = server => {

    /*const joinGroup = require('./join-group');
    const pushGroup = require('./push-group');
    const OnlineUser = require('./online-user');*/

    const io = require('socket.io')(server);
    let online_users = [];

    io.on('connection', socket => {
        console.log("1 người vừa kết nối")
        socket.on('disconnect', () => {
            console.log("1 người vừa thoát")
        });
    });
};

module.exports = sockets;
