/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Discord from "../../lib/api/Discord";

export interface AppContextInterface {
    guildId?: string;
}

export const AppContext = React.createContext<AppContextInterface>({});

export const AppContextWrapper: React.FC = ({ children }) => {
    const { error: allDiscordGuildsError, data: allDiscordGuildsData, isLoading: isAllDiscordGuildsLoading } = Discord.useAllDiscordGuilds();

    const [sharedState, setSharedState] = useState<AppContextInterface>({});

    useEffect(() => {
        setSharedState({
            ...sharedState,
            guildId: (!isAllDiscordGuildsLoading && allDiscordGuildsData) ? allDiscordGuildsData[0].id : ""
        })
    }, [isAllDiscordGuildsLoading, allDiscordGuildsData]);

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return React.useContext(AppContext);
}