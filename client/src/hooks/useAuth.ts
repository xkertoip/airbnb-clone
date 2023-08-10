import {useEffect, useState} from "react";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";
import {getCurrentUser} from "../services/auth.service";
import {toast} from "react-toastify";


export default function useAuth() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['token']);
    const [username, setUsername] = useState<string | undefined>(undefined);

    useEffect(() => {
/*        getCurrentUser()
            .then(({status, user, email}) => {
                if(username !== null) {
                    return status
                        ? toast(`Hello ${user}`, {
                            position: 'top-right'
                        })
                        : (removeCookie(cookies.token,"token"), navigate('/'))
                }
            })
                    const {status, user} = data;
                    console.log(data)*/

    }, []);



    return {username};
}