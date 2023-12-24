import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {API} from "../data/api/Api";


const AuthContext = createContext();

function AuthProvider(props) {
    const {children} = props;

    const [token, setToken] = useState(localStorage.getItem("token"));

    const loginUser = (newToken) => {
        setToken(newToken);
    };

    const logoutUser = () => {
        setToken(undefined);
    };

    useEffect(
        () => {
            if (token) {
                API.defaults.headers.common["Authorization"] = token;
                localStorage.setItem('token',token);
            } else {
                delete API.defaults.headers.common["Authorization"];
                localStorage.removeItem('token')
            }
        },
        [token]
    );

    const contextValue = useMemo(
        () => ({
            token,
            loginUser,
            logoutUser,
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
}
