import {createContext, Dispatch, ReactNode, SetStateAction} from "react";
import useAuth from "../hooks/useAuth";
import { IUserInfo, IUserRegister, IUserLogin } from "../types/user.type";

interface Props {
    children: ReactNode
}
interface IAuthContext {
    user: IUserInfo | null,
    setUser: Dispatch<SetStateAction<IUserInfo | null>>,
    isAuth: boolean,
    setIsAuth: (isAuth: boolean) => void,
    handleLogin: (props: IUserLogin) => void;
    handleRegister: (props: IUserRegister) => void;
    handleLogout: () => void;
/*
    setIsAuth: (isAuth: boolean) => void*/
}
const initialAuthState  = {
    user: null,
    setUser: () => {},
    isAuth: false,
    setIsAuth: () => {},
    handleLogin: () => {},
    handleRegister: () => {},
    handleLogout: () => {}
}



export const AuthContext = createContext<IAuthContext>(initialAuthState)

export function AuthContextProvider({children} : Props ) {
    const {user, setUser, isAuth, setIsAuth, handleLogin, handleLogout, handleRegister} = useAuth();
    return(
            <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth, handleLogin, handleLogout, handleRegister}}>
                {children}
            </AuthContext.Provider>
    )
}

