import {Link} from "react-router-dom";
import { useState, ChangeEvent, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { IUserLogin } from "../types/user.type";


const initialValue: IUserLogin = {
    email: '',
    password: ''
}

export default function LoginPage() {
    const [inputValue, setInputValue] = useState<IUserLogin>(initialValue);
    const {email, password} = inputValue;
    const {handleLogin} = useContext(AuthContext);


    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name] : value
        })
    }

    const handleSubmit =  (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
            handleLogin(inputValue);
            setTimeout(() => {
                setInputValue({
                    ...inputValue,
                    email: '',
                    password: ''
                })
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
                        <Link className={'underline pl-2 text-black font-bold'} to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}