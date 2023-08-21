import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export default function Layout({children}: Props) {
    return(
        <>
            <div className={'p-4 flex flex-col min-h-screen'}>
                <Header/>
                {children}
            </div>
            <ToastContainer/>
        </>
    )
}