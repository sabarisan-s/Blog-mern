import { createContext, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    const contextValue = { userInfo, setUserInfo };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
