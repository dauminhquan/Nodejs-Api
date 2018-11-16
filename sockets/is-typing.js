const helper = require('../helpers/helper');

let handle = (socket, data, userId, online_users) => {
    let friend_id = data.friend_id;
    let user_name = data.user_name;
    let friend_socket_id = helper.findSocketId(online_users, friend_id);

    let data_send_user = {
        user_name: user_name
    };

    socket.broadcast.to(friend_socket_id).emit('is-typing', data_send_user);
};

module.exports = handle;