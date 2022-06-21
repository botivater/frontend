import useSWR from "swr";
import { useToken } from "../../hooks/use-token";
import { configProvider } from "../config/Config.provider";
import fetchWithToken from "../fetchWithToken";
import { Guild } from "./types/Guild";

export const useAllGuilds = () => {
    const token = useToken();
    const { error, data } = useSWR<Guild[]>(token ? [`${configProvider.getApiEndpoint()}/v1/guild`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

export const useGuild = (id?: number) => {
    const token = useToken();
    const { error, data } = useSWR<Guild>(token && id ? [`${configProvider.getApiEndpoint()}/v1/guild/${id}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}