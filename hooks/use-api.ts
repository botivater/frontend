import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";

type Options = {
    audience: string;
    scope: string;
}

export type StateProps = {
    error: Error|null;
    loading: boolean;
    data: any;
}

export const useApi = (url: string, options: Options) => {
    const { getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState<StateProps>({
        error: null,
        loading: true,
        data: null
    });

    useEffect(() => {
        (async () => {
            try {
                const { audience, scope, ...fetchOptions } = options;
                const accessToken = await getAccessTokenSilently({ audience, scope });
                const res = await fetch(url, {
                    ...fetchOptions,
                    headers: {
                        // @ts-ignore
                        ...fetchOptions.headers,
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                setState({
                    ...state,
                    data: await res.json(),
                    error: null,
                    loading: false
                });
            } catch (error) {
                if (error instanceof Error) {
                    setState({
                        ...state,
                        error,
                        loading: false,
                    });
                } else {
                    setState({
                        ...state,
                        error: Error('unknown'),
                        loading: false,
                    });
                }
            }
        })();
    }, []);

    return state;
}