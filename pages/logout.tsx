import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../components/context/AuthContext";

const LogoutPage: NextPage = () => {
    const { doLogout } = useContext(AuthContext)!;
    const [isLoggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        if (!isLoggingOut) {
            setLoggingOut(true);
            doLogout();
        }
        
    }, [isLoggingOut, doLogout]);

    return <div>Logging you out...</div>;
}

export default LogoutPage;