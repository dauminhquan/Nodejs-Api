const helper = require('../helpers/helper');

let handle = (socket, data) => {
    if (data.id_group != undefined && data.id_friend != undefined) {
        let join_group = helper.joinGroup(data.id_friend, data.id_group);
        if (join_group) {
            let friend_id = helper.findSocketId(clientOnline, data.id_friend);
            socket.broadcast.to(friend_id).emit('push-on-group', data.id_group);
        }
    }
};

module.exports = handle;