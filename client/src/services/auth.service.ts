import axios from 'axios';


export const register = (username: string, email:string, password: string) => axios.post('/signup', {username, email, password})

export const login = (email:string, password:string) => axios.post('/login', {email, password})

export const getCurrentUser = () => axios.post('/', {})