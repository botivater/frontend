import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { login, me } from '../../lib/api/Auth.api';

type User = {}

export interface AuthContextInterface {
    accessToken: string | undefined;
    user: User | undefined;
    error: Error | undefined;
    isLoading: boolean;

    doLogin(data: { email: string; password: string }): Promise<void>;
    doLogout(): Promise<void>;
}

const AuthContext = React.createContext<AuthContextInterface | undefined>(undefined);

type Props = {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [isLoading, setLoading] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [checkAuth, setCheckAuth] = useState(false);

    const router = useRouter();

    const doLogin = async ({ email, password }: { email: string, password: string }) => {
        setLoading(true);
        
        try { 
            const loginResponse = await login(email, password);
            setCookie('jwt_token', loginResponse.access_token, { path: '/', sameSite: 'strict' });
            setLoading(false);
            setCheckAuth(true);
        } catch (err) {
            setError(err as Error);
            setLoading(false);
        }
    };

    const checkUserLoggedIn = () => {
        const jwtToken = cookies.jwt_token;
        if (!jwtToken) {
            router.push('/')
            return;
        }

        me(jwtToken)
            .then(me => {
                setAccessToken(jwtToken);
                setUser(me);
                setCheckAuth(false);

                if (router.pathname == '/') router.push('/dashboard');
            })
            .catch(err => {
                setError(err as Error);
                setAccessToken(undefined);
                setUser(undefined);
                setCheckAuth(false);
                router.push('/')
            });
    };

    const doLogout = async () => {
        removeCookie('jwt_token');
        setAccessToken(undefined);
        setUser(undefined);
        router.push('/');
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => checkUserLoggedIn(), [checkAuth]);

    return (
        <AuthContext.Provider value={{ accessToken, user, error, isLoading, doLogin, doLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
