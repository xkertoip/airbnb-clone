import {ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Props = {
    children: ReactNode;
}


export default function GuestRoutes({children}: Props) {
    const {user} = useContext(AuthContext);

    if(user) {
        return <Navigate to={'/'} replace/>;
    }
    return (
        <>
            {children}
        </>
    )
}