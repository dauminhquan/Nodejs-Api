const ChatoneModel = require('../model/chatone');
const helper = require('../helpers/helper');

let handle = (socket, data, userId, online_users) => {
    let message = data.message;
    let type = data.type;
    let friend_id = data.friend_id;

    let friend_socket_id = helper.findSocketId(online_users, friend_id);
    let time = Date.now();

    let data_send_user = {
        id_user: userId,
        message: message,
        type: type,
        time: time
    };

    socket.broadcast.to(friend_socket_id).emit('receive-message-one', JSON.stringify(data_send_user));

    socket.emit('receive-message-one', JSON.stringify(data_send_user));

    let new_chat = new ChatoneModel({
        user_send: userId,
        user_receive: friend_id,
        content: message,
        type: type,
        time: time
    });

    ChatoneModel.createChat(new_chat);
};

module.exports = handle;