import {useContext} from "react";
import {useParams} from "react-router-dom";
import AccountNav from "../components/AccountNav";
import PlacePage from "./PlacePage";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
    const {username} = useContext(AuthContext);
    const {subpage} = useParams();


    return (
        <div>
            <AccountNav subpage={subpage}/>
            {subpage === undefined && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {username}<br />
                    <button className="primary w-full max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacePage />
            )}
        </div>
    )

}
