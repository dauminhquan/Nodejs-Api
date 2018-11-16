const helper = require('../helpers/helper');

let handle = (socket, data, userId, online_users) => {
    let friend_id = data.friend_id;
    let friend_socket_id = helper.findSocketId(online_users, friend_id);

    socket.broadcast.to(friend_socket_id).emit('is-typing', {});
};

module.exports = handle;