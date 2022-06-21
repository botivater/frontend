import useSWR from "swr";
import { useToken } from "../../hooks/use-token";
import { configProvider } from "../config/Config.provider";
import fetchWithToken from "../fetchWithToken";
import { GuildMember } from "./types/GuildMember";

export const useAllGuildMembers = (guildId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<GuildMember[]>(token && guildId ? [`${configProvider.getApiEndpoint()}/v1/guild-member?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

export const useGuildMember = (id?: Pick<GuildMember, 'id'>) => {
    const token = useToken();
    const { error, data } = useSWR<GuildMember>(token && id ? [`${configProvider.getApiEndpoint()}/v1/guild-member/${id}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}
