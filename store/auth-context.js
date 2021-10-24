import { useState, createContext } from "react";
import { signOut, getSession } from "next-auth/client";

const AuthContext = createContext({
    authenticated: false,
    logOut: () => {}
})

export default AuthContext

export const AuthContextProvider = ({children}) => {

    const [logedIn, setLogedIn] = useState(false)
    const [userName, setUserName] = useState("")


    const handleLogin = () => {
        setLogedIn(true)
    }

    const logOut = () => {
        signOut()
    }

    return(
        <AuthContext.Provider value={{logedIn: logedIn, logIn: handleLogin, logOut: logOut, userName: userName}}>
            {children}
        </AuthContext.Provider>
    )


}