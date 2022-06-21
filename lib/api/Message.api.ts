import useSWR from "swr";
import { useToken } from "../../hooks/use-token"
import { configProvider } from "../config/Config.provider";
import fetchWithToken from "../fetchWithToken";
import { GuildChannel } from "./types/GuildChannel";
import { GuildMember } from "./types/GuildMember";
import { Message } from "./types/Message"

export type AllMessagesResponse = {
    0: Message[];
    1: number;
}

export const useAllMessages = (dataDto: { guildChannelId?: Pick<GuildChannel, 'id'>; guildMemberId?: Pick<GuildMember, 'id'>; isRemovedOnDiscord?: boolean; limit?: number; offset?: number; }) => {
    const token = useToken();
    let { guildChannelId, guildMemberId, isRemovedOnDiscord, limit, offset } = dataDto;

    const queryParams = new URLSearchParams();

    queryParams.append("guildChannelId", guildChannelId ? guildChannelId.toString() : "");
    queryParams.append("guildMemberId", guildMemberId ? guildMemberId.toString() : "");

    if (isRemovedOnDiscord !== undefined) {
        queryParams.append("isRemovedOnDiscord", isRemovedOnDiscord.toString());
    }

    queryParams.append("limit", limit ? limit.toString() : "50");
    queryParams.append("offset", offset ? offset.toString() : "0");
        
    const { error, data } = useSWR<AllMessagesResponse>(token && (guildChannelId || guildMemberId) ? [`${configProvider.getApiEndpoint()}/v1/message?${queryParams.toString()}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}
