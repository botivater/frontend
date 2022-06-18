import { NextPage } from "next";
import { useContext } from "react";
import AuthContext from "../components/context/AuthContext";

const LogoutPage: NextPage = () => {
    const { doLogout } = useContext(AuthContext)!;

    doLogout();

    return <div>Logging you out...</div>;
}

export default LogoutPage;