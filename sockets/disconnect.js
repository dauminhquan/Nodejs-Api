let handle = (socket, online_users) => {
    online_users = online_users.filter(value => {
        return value.socket_id != socket.id;
    });

    return online_users;
};

module.exports = handle;