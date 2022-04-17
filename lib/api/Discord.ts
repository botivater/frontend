import useSWR from "swr";
import { apiEndpoint, ApiResponse } from ".";
import { useToken } from "../../hooks/use-token";
import fetchWithToken from "../fetchWithToken";

export type Guild = {
    id: string;
    name: string;
}

export type GuildChannel = {
    id: string;
    name: string;
}

export type GuildMember = {
    displayAvatarURL: string;
    displayName: string;
    nickname: string;
    roles: string[];
    userId: string;
}

export type GuildRole = {
    id: string;
    name: string;
}

export type CommandFlowEntity = {
    id: number;
    createdAt: string;
    updatedAt: string;
    commandFlowGroup: number;
    onType: number;
    buildingBlockType: number;
    checkType?: number;
    checkValue?: string;
    options: string;
    order: number;
}

export type CommandFlowGroup = {
    id: number;
    createdAt: string;
    updatedAt: string;
    guild: number;
    name: string;
    description: string;
    type: number;
    messageId: string;
    channelId: string;
    messageText: string;
    reactions: string;
    commandFlows: CommandFlowEntity[];
}

const useAllDiscordGuilds = () => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<Guild[]>>(token ? [`${apiEndpoint}/discord/guilds`, token] : null, fetchWithToken);

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

const useDiscordGuild = (guildId: string) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<Guild>>(token ? [`${apiEndpoint}/discord/guilds/${guildId}`, token] : null, fetchWithToken);

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

const useDiscordGuildChannels = (guildId: string) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<GuildChannel[]>>(token ? [`${apiEndpoint}/discord/guilds/${guildId}/channels`, token] : null, fetchWithToken);

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

const useDiscordGuildTextChannels = (guildId: string) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<GuildChannel[]>>(token ? [`${apiEndpoint}/discord/guilds/${guildId}/channels?type=text`, token] : null, fetchWithToken);

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

const useDiscordGuildVoiceChannels = (guildId: string) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<GuildChannel[]>>(token ? [`${apiEndpoint}/discord/guilds/${guildId}/channels?type=voice`, token] : null, fetchWithToken);

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

const useAllDiscordGuildChannels = () => {
    const token = useToken();

    const customFetcher = async (key: string, token: string) => {
        const guilds = await fetchWithToken<Guild[]>(`${apiEndpoint}/discord/guilds`, token);
        if (!guilds.data) throw new Error("Could not get guilds");

        const guildChannels = await Promise.all(
            guilds.data.map(guild => {
                return fetchWithToken<GuildChannel[]>(`${apiEndpoint}/discord/guilds/${guild.id}/channels`, token)
            })
        )

        return guildChannels.map(guildChannel => guildChannel.data || []).flat();
    }

    const { error, data } = useSWR<GuildChannel[]>(token ? [`internal_${apiEndpoint}_useAllDiscordGuildChannels`, token] : null, customFetcher);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

const useDiscordGuildMembers = (guildId: string) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<GuildMember[]>>(token ? [`${apiEndpoint}/discord/guilds/${guildId}/members`, token] : null, fetchWithToken);

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

const useAllDiscordGuildMembers = () => {
    const token = useToken();

    const customFetcher = async (key: string, token: string) => {
        const guilds = await fetchWithToken<Guild[]>(`${apiEndpoint}/discord/guilds`, token);
        if (!guilds.data) throw new Error("Could not get guilds");

        const guildMembers = await Promise.all(
            guilds.data.map(guild => {
                return fetchWithToken<GuildMember[]>(`${apiEndpoint}/discord/guilds/${guild.id}/members`, token)
            })
        )

        return guildMembers.map(guildMember => guildMember.data || []).flat();
    }

    const { error, data } = useSWR<GuildMember[]>(token ? [`internal_${apiEndpoint}_useAllDiscordGuildMembers`, token] : null, customFetcher);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

const useDiscordGuildRoles = (guildId: string) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<GuildRole[]>>(token ? [`${apiEndpoint}/discord/guilds/${guildId}/roles`, token] : null, fetchWithToken);

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

const useAllDiscordGuildRoles = () => {
    const token = useToken();

    const customFetcher = async (key: string, token: string) => {
        const guilds = await fetchWithToken<Guild[]>(`${apiEndpoint}/discord/guilds`, token);
        if (!guilds.data) throw new Error("Could not get guilds");

        const guildRoles = await Promise.all(
            guilds.data.map(guild => {
                return fetchWithToken<GuildRole[]>(`${apiEndpoint}/discord/guilds/${guild.id}/roles`, token)
            })
        )

        return guildRoles.map(guildRole => guildRole.data || []).flat();
    }

    const { error, data } = useSWR<GuildRole[]>(token ? [`internal_${apiEndpoint}_useAllDiscordGuildRoles`, token] : null, customFetcher);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

const useAllReactionCollectors = () => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<CommandFlowGroup[]>>(token ? [`${apiEndpoint}/discord/reactionCollectors`, token] : null, fetchWithToken);

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

const useReactionCollector = (reactionCollectorId: number) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<CommandFlowGroup>>(token ? [`${apiEndpoint}/discord/reactionCollectors/${reactionCollectorId}`, token] : null, fetchWithToken);

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
    useAllDiscordGuilds,
    useDiscordGuild,
    useDiscordGuildChannels,
    useDiscordGuildTextChannels,
    useDiscordGuildVoiceChannels,
    useAllDiscordGuildChannels,
    useDiscordGuildMembers,
    useAllDiscordGuildMembers,
    useDiscordGuildRoles,
    useAllDiscordGuildRoles,
    useAllReactionCollectors,
    useReactionCollector
}

export default exports;
