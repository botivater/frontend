/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Discord from "../../lib/api/Discord";
import { useTenant } from "../../lib/tenant";

export interface AppContextInterface {
    guildId?: string;
}

export const AppContext = React.createContext<AppContextInterface>({});

export const AppContextWrapper: React.FC = ({ children }) => {
    const { data: guildId } = useTenant();
    const [sharedState, setSharedState] = useState<AppContextInterface>({});

    useEffect(() => {
        setSharedState({
            ...sharedState,
            guildId: guildId || undefined
        });
    }, [guildId]);

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return React.useContext(AppContext);
}