const helper = require('../helpers/helper');

let handle = (socket, data, user) => {
    let id_user = user.id_user;
    socket.join(data.id_group);
    helper.joinGroup(id_user, data.id_group);
};

module.exports = handle;