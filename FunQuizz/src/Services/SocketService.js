import io from 'socket.io-client';
import { EmitType } from '~/Enums/EmitType';
import { ListenType } from '~/Enums/ListenType';

const ENDPOINT = 'http://acme.com';
const socket = io.connect(ENDPOINT);
console.log(socket);
export default class SocketService {
    roomId = '';

    currentUser = null;

    roomMembers = [];

    connectToSocket() {
        console.log(socket);
        console.log('Connected to socketio');

        // socket.on(ListenType.CREATE_ROOM_SUCCESS, (message) => {
        //     console.log("Success to create room: " + message.roomId)
        //     this.roomId =  message.roomId;
        //     socket.emit(EmitType.JOIN_ROOM, { email: this.currentUser.email, roomId: message.roomId });
        // });

        // socket.on(ListenType.SERVER_UPDATE_USER, ({ room, users }) => {
        //     this.roomMembers = users;
        //     console.log(`room: ${room} has users:`);
        //     console.log(this.roomMembers);
        //     console.log(users);

        // });
        console.log('Register message');
    }

    constructor(user) {
        this.currentUser = user;
    }

    send = (message) => {
        socket.emit(EmitType.USER_SEND_MESSAGE, message)
    }

    joinRoom = (roomId) => {
        console.log("joining room" + roomId)
        socket.emit(EmitType.JOIN_ROOM, { email: this.currentUser.email, roomId: roomId });
    }

    createRoom = (examId) => {
        console.log("creating room" + examId)
        socket.emit(EmitType.CREATE_ROOM, { email: this.currentUser.email, examId: examId });
    }

    // disconnect - used when unmounting
    disconnect () {
    //     socket.disconnect();
    }
}
