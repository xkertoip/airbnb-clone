export type IUser = {
    _id?: string | null;
    username: string;
    email: string;
    password: string,
    roles?: Array<string>
}

export type IUserLogin = Pick<IUser, "email" | "password">
export type IUserRegister = Omit<IUser, "_id" | "roles">
export type IUserInfo = Omit<IUser, "_id" | "password" | "roles">


