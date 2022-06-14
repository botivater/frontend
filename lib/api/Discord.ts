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
    type: string;
}

export type GuildChannelResponse = {
    success: boolean;
    error: number;
    channels: GuildChannel[];
}

export type GuildMember = {
    displayAvatarURL: string;
    displayName: string;
    nickname: string;
    roles: string[];
    userId: string;
}

export type GuildMemberResponse = {
    success: boolean;
    error: number;
    members: GuildMember[];
}

export type GuildRole = {
    id: string;
    name: string;
}

export type GuildRoleResponse = {
    success: boolean;
    error: number;
    roles: GuildRole[];
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
    const { error, data } = useSWR<Guild[]>(token ? [`${apiEndpoint}/v1/guild`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

const useDiscordGuild = (guildId?: string) => {
    const token = useToken();
    const { error, data } = useSWR<Guild>(token && guildId ? [`${apiEndpoint}/v1/guild/${guildId}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

const useDiscordGuildChannels = (guildId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<GuildChannelResponse>(token && guildId ? [`${apiEndpoint}/v1/discord/guild-channel?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data: data ? data.channels : undefined,
        isLoading: !error && !data,
        error
    }
}

const useDiscordGuildTextChannels = (guildId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<GuildChannelResponse>(token && guildId ? [`${apiEndpoint}/v1/discord/guild-channel?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data: data ? data.channels.filter(c => c.type == "GUILD_TEXT") : undefined,
        isLoading: !error && !data,
        error
    }
}

const useDiscordGuildVoiceChannels = (guildId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<GuildChannelResponse>(token ? [`${apiEndpoint}/v1/discord/guild-channel?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data: data ? data.channels.filter(c => c.type == "GUILD_VOICE") : undefined,
        isLoading: !error && !data,
        error
    }
}

const useAllDiscordGuildChannels = () => {
    const token = useToken();

    const customFetcher = async (key: string, token: string) => {
        const guilds = await fetchWithToken<Guild[]>(`${apiEndpoint}/v1/guild`, token);
        if (!guilds) throw new Error("Could not get guilds");

        const guildChannels = await Promise.all(
            guilds.map(guild => {
                return fetchWithToken<GuildChannel[]>(`${apiEndpoint}/v1/discord/guild-channel?guildId=${guild.id}`, token)
            })
        )

        return guildChannels.map(guildChannel => guildChannel || []).flat();
    }

    const { error, data } = useSWR<GuildChannel[]>(token ? [`internal_${apiEndpoint}_useAllDiscordGuildChannels`, token] : null, customFetcher);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

const useDiscordGuildMembers = (guildId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<GuildMemberResponse>(token && guildId ? [`${apiEndpoint}/v1/discord/guild-member?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data: data ? data.members : undefined,
        isLoading: !error && !data,
        error
    }
}

const useDiscordGuildRoles = (guildId?: string) => {
    const token = useToken();
    const { error, data } = useSWR<GuildRoleResponse>(token && guildId ? [`${apiEndpoint}/v1/discord/guild-role?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

const useAllReactionCollectors = () => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<CommandFlowGroup[]>>(token ? [`${apiEndpoint}/v1/discord/reactionCollectors`, token] : null, fetchWithToken);

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

const useReactionCollector = (reactionCollectorId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<CommandFlowGroup>>(token && reactionCollectorId ? [`${apiEndpoint}/v1/discord/reactionCollectors/${reactionCollectorId}`, token] : null, fetchWithToken);

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

// We cannot use React hooks here.
const createReactionCollector = async (token: string, data: {
    type: number,
    guildId: string,
    channelId: string,
    name: string,
    description: string,
    messageText: string,
    reactions: string[],
    commandFlows: unknown[],
}) => {
    console.log(data);
    const response = await fetch(`${apiEndpoint}/v1/discord/reactionCollectors`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    });

    const responseJson = await response.json();

    return response.status === 200;
}

const sortChannelsByNameAsc = (a: GuildChannel, b: GuildChannel) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}

const sortChannelsByNameDesc = (a: GuildChannel, b: GuildChannel) => {
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
}

const sortMembersByDisplayNameAsc = (a: GuildMember, b: GuildMember) => {
    if (a.displayName > b.displayName) return 1;
    if (a.displayName < b.displayName) return -1;
    return 0;
}

const sortMembersByDisplayNameDesc = (a: GuildMember, b: GuildMember) => {
    if (a.displayName > b.displayName) return -1;
    if (a.displayName < b.displayName) return 1;
    return 0;
}

const sortRolesByNameAsc = (a: GuildRole, b: GuildRole) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}

const sortRolesByNameDesc = (a: GuildRole, b: GuildRole) => {
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
}

const exports = {
    useAllDiscordGuilds,
    useDiscordGuild,
    useDiscordGuildChannels,
    useDiscordGuildTextChannels,
    useDiscordGuildVoiceChannels,
    useAllDiscordGuildChannels,
    useDiscordGuildMembers,
    useDiscordGuildRoles,
    useAllReactionCollectors,
    useReactionCollector,
    createReactionCollector,
    sortChannelsByNameAsc,
    sortChannelsByNameDesc,
    sortMembersByDisplayNameAsc,
    sortMembersByDisplayNameDesc,
    sortRolesByNameAsc,
    sortRolesByNameDesc
}

export default exports;
