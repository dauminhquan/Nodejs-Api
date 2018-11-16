const ChatgroupModel = require('../model/chatgroup');
const FriendsModel = require('../model/friends');

let handle = (socket, id_user, clientOnline) => {
    ChatgroupModel.getGroupsByUserId(id_user, (err, results) => {
        if (results != undefined) {
            results.forEach(item => {
                socket.join(item._id);
            })
        }
    });
    FriendsModel.getFriendsByUserId(id_user, (err, results) => {
        if (err) throw err;
        let listFriend = results.map(item => {
            if (item.user_send != parseInt(id_user)) {
                return item.user_send;
            } else {
                return item.user_receive;
            }
        });

        let list_idClient = listFriend.map(idUser => {
            let idClient = clientOnline.find(item => {
                return item.id_user == idUser;
            });

            if (idClient != undefined) {
                return idClient;
            }
        });

        let listIdClientFriend = list_idClient.filter(value => {
            return value != undefined;
        });

        listIdClientFriend.forEach(item => {
            socket.broadcast.to(item.id_client).emit('friends-online', {id_user: id_user, id_client: socket.id})
        });

        let list_friend_online = [];

        for (let i = 0; i < listIdClientFriend.length; i++) {
            for (j = 0; j < clientOnline.length; j++) {
                if (listIdClientFriend[i].id_user == clientOnline[j].id_user) {
                    list_friend_online.push(clientOnline[j]);
                    break;
                }
            }
        }

        socket.emit('list-friend-online', list_friend_online);
    });
};

module.exports = handle;