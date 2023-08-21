import {useEffect, useState} from "react";
import { IUserInfo, IUserLogin, IUserRegister } from "../types/user.type";
import axios from 'axios';
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

export default function useAuth() {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUserInfo | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const bookingApp = axios.create({
        baseURL: `http://127.0.0.1:4000/api`,
        withCredentials: true
    })

    useEffect(() => {
            if(!user) {
                handleCurrentUser();
            }
    }, []);

    const handleError = (err: any) => {
        toast.error(err, {
            position: "bottom-left"
        })
    }
    const handleSuccess = (msg: any) => {
        toast.success(msg, {
            position: "bottom-left"
        })
    }

    const handleRegister = async (props: IUserRegister) => {
        try {
            const res = await bookingApp.post('/register', {props});
            handleSuccess(res.data.message);
            setTimeout(() => navigate('/login'))
        } catch ( error ) {
            const status = error.response.status;
            if(status === 409 || status === 401) {
                handleError(error.response.data.message);
            } else {
                handleError("Something went wrong, try again later");
            }
        }
    }
    const handleLogin = async (props: IUserLogin) => {
        try{
            const res = await bookingApp.post('/login', {props});
            const {data} = await res;
            setIsAuth(data.success);
            setUser(data.user);
            handleSuccess(data.message);
            setTimeout(() => {
                navigate('/');
            })
        } catch (error) {
            const status = error.response.status;
            if(status === 400 || status === 401) {
                handleError(error.response.data.message);
            } else {
                handleError("Something went wrong, try again later");
            }
        }

    }
    const handleCurrentUser =  async () => {
        try {
            const response = await bookingApp.get('/profile', {});
            setUser(response.data.user);
            if(response.data.user.role !== 'admin') {
                return handleSuccess(response.data.message)
            }
            setTimeout(() => {
                handleSuccess(response.data.message);
                navigate('/adminboard');
            })
        } catch (error) {
            const status = error.response.status;
            if(status === 400 || status === 401) {
                handleError(error.response.data.message);
            } else {
                handleError("Something went wrong, try again later");
            }
        }
    }
    const handleLogout = async () => {
        try {
            const response = await bookingApp.get('/logout', { withCredentials: true});
            handleSuccess(response.data.message);
            setUser(null);
            setTimeout(() => {
                navigate('/');
            })
        } catch (error) {
            const status = error.response.status;
            if(status === 400 || status === 401) {
                handleError(error.response.data.message);
            } else {
                handleError("Something went wrong, try again later");
            }
        }
    }


    return {user, setUser, setIsAuth, isAuth, handleRegister, handleLogin, handleLogout};
}