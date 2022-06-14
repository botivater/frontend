import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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

    const router = useRouter();

    const doLogin = async ({ email, password }: { email: string, password: string }) => {
        setLoading(true);
        
        try { 
            const loginResponse = await login(email, password);
            setAccessToken(loginResponse.access_token);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const checkUserLoggedIn = () => {
        me(accessToken)
            .then(me => {
                setUser(me);
                router.push('/dashboard');
            })
            .catch(err => {
                setError(err as Error);
                router.push('/')
            });
    };

    const doLogout = async () => {

    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => checkUserLoggedIn(), [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken, user, error, isLoading, doLogin, doLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
