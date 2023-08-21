import {Link, Navigate} from "react-router-dom";
import { useState, ChangeEvent, useContext } from "react";
import { IUser } from "../types/user.type";
import { AuthContext } from "../context/AuthContext";


export default function RegisterPage() {
    const {handleRegister, user} = useContext(AuthContext);
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

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            handleRegister(inputValue);
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
    if(user) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={'grow flex items-center justify-around'}>
            <div className={'mb-64'}>
                <h1 className={'text-4xl text-center mb-4'}>Register</h1>
                <form className={'max-w-md mx-auto'} onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="John Doe" value={username} onChange={handleOnChange}/>
                    <input type="email" name="email" placeholder="your@email.com" value={email} onChange={handleOnChange}/>
                    <input type="password" name="password" placeholder="password" value={password} onChange={handleOnChange}/>
                    <button type="submit" className={'primary w-full'}>Register</button>
                    <div className={'text-center py-2 text-gray-500'}>Have you account already?
                        <Link className={'underline pl-2 text-black font-bold'} to={'/login'}>Login</Link>
                    </div>

                </form>
            </div>

        </div>
    )
}