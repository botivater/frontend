import { NextPage } from "next";
import { useContext, useEffect } from "react";
import AuthContext from "../components/context/AuthContext";

const LogoutPage: NextPage = () => {
    const { doLogout } = useContext(AuthContext)!;

    useEffect(() => {
        doLogout();
    });

    return <div>Logging you out...</div>;
}

export default LogoutPage;