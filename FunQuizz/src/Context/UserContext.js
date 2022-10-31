import React from "react";
import { createContext } from "react";

const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = React.useState('');

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;