import socketio from 'socket.io-client';
import React, { createContext } from 'react';
import UserContext from '~/Context/UserContext';
import SocketService from '~/Services/SocketService';


const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {

    const { user, setUser } = React.useContext(UserContext);

    const socketService = new SocketService(user);

    return (
        <SocketContext.Provider value={socketService}>
            {children}
        </SocketContext.Provider>
    );
};


export default SocketContext;