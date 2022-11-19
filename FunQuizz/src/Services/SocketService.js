import io from 'socket.io-client';
import { EmitType } from '~/Enums/EmitType';
import { ListenType } from '~/Enums/ListenType';

const ENDPOINT = 'http://acme.com';

export default  class SocketService {
    
    roomId = '';

    socket = {};

    currentUser = null;

    roomMembers = [];

    constructor(user) {
        this.currentUser = user;
        console.log('Connecting to socketio');
        this.socket = io.connect(ENDPOINT);

        this.socket.on(ListenType.CREATE_ROOM_SUCCESS, (message) => {
            console.log("Success to create room: " + message.roomId)
            this.roomId =  message.roomId;
            this.socket.emit(EmitType.JOIN_ROOM, { email: this.currentUser.email, roomId: message.roomId });
        });

        this.socket.on(ListenType.SERVER_UPDATE_USER, ({ room, users }) => {
            this.roomMembers = users;
            console.log(`room: ${room} has users:`);
            console.log(this.roomMembers);
            console.log(users);

        });
        console.log('Register message');
    }

    isConnected(){
        return this.socket.connected
    }

    reconnect(){
        this.socket.connect();
    }

    send = (message) => {
        this.socket.emit(EmitType.USER_SEND_MESSAGE, message)
    }

    joinRoom = (roomId) => {
        console.log("joining room" + roomId)
        this.socket.emit(EmitType.JOIN_ROOM, { email: this.currentUser.email, roomId: roomId });
    }

    createRoom = (examId) => {
        console.log("creating room" + examId)
        this.socket.emit(EmitType.CREATE_ROOM, { email: this.currentUser.email, examId: examId });
    }

    // disconnect - used when unmounting
    disconnect () {
        this.socket.disconnect();
    }
}
