import axios from 'axios';

const bookingApp = axios.create({
    baseURL: `http://127.0.0.1:4000/api`,
    timeout: 1000,
    withCredentials: true
})
export const register = async (username: string, email:string, password: string) => await bookingApp.post('/register', {username, email, password})

export const login =async (email:string, password:string) => await bookingApp.post('/login', {email, password})

export const getCurrentUser = async () => await bookingApp.get('/', {})