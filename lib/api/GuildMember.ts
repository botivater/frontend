import useSWR from "swr";
import { apiEndpoint, ApiResponse } from ".";
import { useToken } from "../../hooks/use-token";
import fetchWithToken from "../fetchWithToken";

export type GuildMember = {
    id: number;
    createdAt: string;
    updatedAt: string;
    
    // Discord GuildMember Snowflake.
    uid: string;

    // Friendly name of the guild member.
    name: string;

    // Discord user identifier.
    identifier: string;

    // The user's birthday, if it has been entered.
    birthday?: string;

    // The user's last interaction date, if any.
    lastInteraction?: string;

    // Is the user active or non-active?
    active: boolean;

    // Guild ID in the database.
    guild: number;
}

const useAllGuildMembers = () => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<GuildMember[]>>(token ? [`${apiEndpoint}/guildMember`, token] : null, fetchWithToken);

    if (data && data.error) {
        return {
            data: undefined,
            isLoading: !error && !data,
            error: data.error
        }
    }

    return {
        data: data?.data,
        isLoading: !error && !data,
        error
    }
}

const useGuildMember = (id?: number) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<GuildMember>>(token && id ? [`${apiEndpoint}/guildMember/${id}`, token] : null, fetchWithToken);

    if (data && data.error) {
        return {
            data: undefined,
            isLoading: !error && !data,
            error: data.error
        }
    }

    return {
        data: data?.data,
        isLoading: !error && !data,
        error
    }
}

const exports = {
    useAllGuildMembers,
    useGuildMember
}

export default exports;
