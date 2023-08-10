import axios from "axios";
import { IUserLogin } from "../types/user.type";


export async function login(params: {
    email: string;
    password: string
}): Promise<IUserLogin> {
    const response = await axios.post("/login", {params});
    return response.data
};

export async function logout() {
    const response = await axios.delete("/login");
    return response.data;
}