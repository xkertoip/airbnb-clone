import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {register} from "../services/auth.service";
import { useState, ChangeEvent } from "react";
import { IUser } from "../types/user.type";


export default function RegisterPage() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<IUser>({
        email: '',
        username: '',
        password: ''
    });
    const { email, username, password } = inputValue;
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
            position: "bottom-right",
        })
    }
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const {username, email, password} = inputValue;
            const {data} = await register(username, email, password);
            const {success, message} = data;
            if(success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else {
                handleError(message)
            }
        } catch (err) {
            console.log(err);
        }
        setInputValue({
            ...inputValue,
            email: '',
            password: '',
            username: ''
        });
    }

    return (
        <div className={'grow flex items-center justify-around'}>
            <div className={'mb-64'}>
                <h1 className={'text-4xl text-center mb-4'}>Register</h1>
                <form className={'max-w-md mx-auto'} onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="John Doe" value={username} onChange={handleOnChange}/>
                    <input type="email" name="email" placeholder="your@email.com" value={email} onChange={handleOnChange}/>
                    <input type="password" name="password" placeholder="password" value={password} onChange={handleOnChange}/>
                    <button className={'primary w-full'}>Register</button>
                    <div className={'text-center py-2 text-gray-500'}>Have you account already?
                        <Link className={'underline pl-2 text-black font-bold'} to={'/login'}>Login</Link>
                    </div>

                </form>
            </div>

        </div>
    )
}