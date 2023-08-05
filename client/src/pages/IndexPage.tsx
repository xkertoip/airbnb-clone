import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function IndexPage() {

    const { username } = useContext(AuthContext);
    return (
        <div className={'py-4'}>
            indexpage

            {username ? (
                <>
                    <div>hello, {username}</div>
                </>
            ) : null
            }

        </div>
    )
}