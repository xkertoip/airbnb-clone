import Header from "./components/Header";
import { Outlet} from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Layout() {
    return(
        <>
            <div className={'p-4 flex flex-col min-h-screen'}>
                <Header/>
                <Outlet/>
            </div>
            <ToastContainer/>
        </>
    )
}