export interface IUser {
    _id?: string | null;
    username: string;
    email: string;
    password: string,
    roles?: Array<string>
}
export interface IUserLogin {
    email:string,
    password: string
}
export interface IUserRegister extends IUserLogin{
    username: string;
}

