import io from 'socket.io-client';
import { EmitType } from '~/Enums/EmitType';
import { ListenType } from '~/Enums/ListenType';
import ExamService from './ExamService';
import LocalStorageService from './LocalStorageService';

// const ENDPOINT = 'http://acme.com';
const ENDPOINT = 'localhost:3005';

export default class SocketService {
    roomId = '';

    socket = {};

    currentEmail = null;

    exam = null;

    roomMembers = [];

    constructor() {
        const { email } = LocalStorageService.get();
        this.currentEmail = email;
        console.log('Connecting to socketio');
        this.socket = io.connect(ENDPOINT);

        this.socket.on(ListenType.CREATE_ROOM_SUCCESS, (message) => {
            console.log('Success to create room: ' + message.roomId);
            this.roomId = message.roomId;
            this.socket.emit(EmitType.JOIN_ROOM, { email: this.currentEmail, roomId: message.roomId });
        });
    }

    isConnected() {
        return this.socket.connected;
    }

    reconnect() {
        this.socket.connect();
    }

    startExam() {
        console.log('start quiz...');
        this.socket.emit(EmitType.START_EXAM);
    }

    nextQuestion() {
        console.log('Moving to next question...');
        this.socket.emit(EmitType.START_QUESTION);
    }

    send = (message) => {
        this.socket.emit(EmitType.USER_SEND_MESSAGE, message);
    };

    joinRoom = (roomId) => {
        console.log('joining room' + roomId);
        this.socket.emit(EmitType.JOIN_ROOM, { email: this.currentEmail, roomId: roomId });
        let examId = roomId.split('_').at(-1);
        console.log('exam Id: ', examId);

        ExamService.getById(
            examId,
            (response) => {
                this.exam = response.data.data;
                console.log('exam ne: ', this.exam);
            },
            (error) => console.log(error),
        );
    };

    createRoom = (examId) => {
        console.log('creating room' + examId);
        this.socket.emit(EmitType.CREATE_ROOM, { email: this.currentEmail, examId: examId });

        ExamService.getById(
            examId,
            (response) => {
                this.exam = response.data.data;
                console.log('exam ne: ', this.exam);
            },
            (error) => console.log(error),
        );
    };

    chooseAnswer = (questionId, answerId, totalTime) => {
        console.log('choose an answer id: ' + answerId + ' with question id: ' + questionId);
        this.socket.emit(EmitType.USER_CHOOSE_OPTION, {
            questionId: questionId,
            optionId: answerId,
            totalTime,
        });
    };

    submitExam = () => {
        this.socket.emit(EmitType.SUBMIT_TEST);
    };

    questionTimeout = (questionId) => {
        this.socket.emit(EmitType.QUESTION_TIMEOUT, questionId);
    }

    // disconnect - used when unmounting
    disconnect() {
        this.socket.disconnect();
    }
}
