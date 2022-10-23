const socketio = require("socket.io");
const serverName = "ExamServer";
const formatMessage = require("../utils/message");
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
  } = require("../utils/user");

const EventType = {
    USER_CONNECT: 'connection',
    USER_DISCONNECT: 'disconnect',
    SERVER_SEND_MESSAGE: 'server-send-message',
    USER_SEND_MESSAGE: 'user-send-message',
    USER_JOIN_ROOM: 'user-join-room',
    SERVER_UPDATE_USER: 'server-update-user'
}

class SocketIO {
  connect(server) {
    let io = socketio(server, {
        cors: { 
          origin: "*",
          methods: ["GET", "POST"]
        }
      });
    
    //
    io.on(EventType.USER_CONNECT, function (socket) {
        socket.on(EventType.USER_JOIN_ROOM, ({username, room})=>{

            const user = userJoin(socket.id, username, room)

            socket.join(user.room)

            io.to(user.room).emit(EventType.SERVER_UPDATE_USER, {
                room: user.room,
                users: getRoomUsers(user.room)  
            })

            socket.emit(EventType.SERVER_SEND_MESSAGE, formatMessage(serverName,"Welcome to the chat room"))

            socket.broadcast.to(user.room).emit(EventType.SERVER_SEND_MESSAGE, formatMessage(serverName, `${user.username} has joined the channel`))
            
            socket.on(EventType.USER_SEND_MESSAGE, function(message){
                const user = getCurrentUser(socket.id)

                io.to(user.room).emit(EventType.SERVER_SEND_MESSAGE, formatMessage(user.username, message))
            })

            socket.on(EventType.USER_DISCONNECT, function () {
                
                const user = userLeave(socket.id)
                if(user)
                {
                    io.to(user.room).emit(EventType.SERVER_UPDATE_USER, {
                        room: user.room,
                        users: getRoomUsers(user.room)  
                    })
                    io.to(user.room).emit(EventType.SERVER_SEND_MESSAGE, formatMessage(serverName, `${user.username} has left the channel`))
                }
            })
        });

    });

    //Broadcast when user connect
    
  }
}

module.exports = new SocketIO();
