import {Link,useNavigate} from "react-router-dom";
import { login } from '../services/auth.service';
import {toast} from "react-toastify";
import { useState, ChangeEvent, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


interface LoginProps {
    email: string;
    password: string
}
const initialValue: LoginProps = {
    email: '',
    password: ''
}

export default function LoginPage() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<LoginProps>(initialValue);
    const {email, password} = inputValue;
    const { setIsAuth } = useContext(AuthContext);


    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name] : value
        })
    }

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
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const {data} = await login(email, password);
            const {success, message} = data;
            if (success) {
                handleSuccess(message);
                setIsAuth(true);
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } else {
                handleError(message);
            }
        } catch (err) {
            console.log(err)
        }
        setInputValue({
            ...inputValue,
            email: '',
            password: ''
        })
    }

    return (
        <div className={'grow flex items-center justify-around'}>
            <div className={'mb-64'}>
                <h1 className={'text-4xl text-center mb-4'}>Login</h1>
                <form className={'max-w-md mx-auto'} onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={handleOnChange}/>
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handleOnChange}/>
                    <button className={'primary w-full'}>Login</button>
                    <div className={'text-center py-2 text-gray-500'}>Don't have an account yet?
                        <Link className={'underline pl-2 text-black font-bold'} to={'/signup'}>Register now</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}