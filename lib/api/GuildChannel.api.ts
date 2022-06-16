import useSWR from "swr";
import { useToken } from "../../hooks/use-token"
import { configProvider } from "../config/Config.provider";
import fetchWithToken from "../fetchWithToken";
import { GuildChannel } from "./types/GuildChannel";

export const useAllGuildChannels = (guildId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<GuildChannel[]>(token && guildId ? [`${configProvider.getApiEndpoint()}/v1/guild-channel?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}
