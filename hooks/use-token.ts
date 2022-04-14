import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";


export const useToken = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const accessToken = await getAccessTokenSilently({ audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || "", scope: "" });
            setState(accessToken);
        })();
    }, []);

    return state;
}