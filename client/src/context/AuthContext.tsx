import {createContext, ReactNode} from "react";
import useAuth from "../hooks/useAuth";

interface Props {
    children: ReactNode
}
interface IAuthContext {
    username: string | undefined
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void
}
const initialAuthState  = {
    username: undefined,
    isAuth: false,
    setIsAuth: () => {},
}



export const AuthContext = createContext<IAuthContext>(initialAuthState)

export function AuthContextProvider({children} : Props ) {
    const {username, isAuth, setIsAuth} = useAuth();
    return(
        <AuthContext.Provider value={{ username, isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

