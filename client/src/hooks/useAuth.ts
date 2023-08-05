import {useEffect, useState} from "react";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";
import {getCurrentUser} from "../services/auth.service";
import {toast} from "react-toastify";


export default function useAuth() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['token']);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const verifyCookie = async () => {
                    const { data } = await getCurrentUser();
                    const {status, user} = data;
                    console.log(data)
                    setUsername(user);
                    if(username !== null) {
                        return status
                            ? toast(`Hello ${user}`, {
                                position: 'top-right'
                            })
                            : (removeCookie(cookies.token,"token"), navigate('/'))
                    }
        };
        verifyCookie()

    }, []);



    return {username, isAuth, setIsAuth};
}