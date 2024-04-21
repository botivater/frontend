import useSWR from 'swr'
import { useToken } from '../../hooks/use-token'
import { configProvider } from '../config/Config.provider'
import fetchWithToken from '../fetchWithToken'

export type Guild = {
  id: string
  name: string
}

export type GuildChannel = {
  id: string
  name: string
  type: string
}

export type GuildChannelResponse = {
  success: boolean
  error: number
  channels: GuildChannel[]
}

export type GuildMember = {
  displayAvatarURL: string
  displayName: string
  nickname: string
  roles: string[]
  userId: string
}

export type GuildMemberResponse = {
  success: boolean
  error: number
  members: GuildMember[]
}

export type GuildRole = {
  id: string
  name: string
}

export type GuildRoleResponse = {
  success: boolean
  error: number
  roles: GuildRole[]
}

export type CommandFlowEntity = {
  id: number
  createdAt: string
  updatedAt: string
  commandFlowGroup: number
  onType: number
  buildingBlockType: number
  checkType?: number
  checkValue?: string
  options: string
  order: number
}

export type CommandFlowGroup = {
  id: number
  createdAt: string
  updatedAt: string
  guild: number
  name: string
  description: string
  type: number
  messageId: string
  channelId: string
  messageText: string
  reactions: string
  commandFlows: CommandFlowEntity[]
}

export const useAllDiscordGuilds = () => {
  const token = useToken()
  const { error, data } = useSWR<Guild[]>(
    token ? [`${configProvider.getApiEndpoint()}/v1/guild`, token] : null,
    fetchWithToken
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}

export const useDiscordGuild = (guildId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<Guild>(
    token && guildId
      ? [`${configProvider.getApiEndpoint()}/v1/guild/${guildId}`, token]
      : null,
    fetchWithToken
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}

export const useDiscordGuildChannels = (guildId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<GuildChannelResponse>(
    token && guildId
      ? [
          `${configProvider.getApiEndpoint()}/v1/discord/guild-channel?guildId=${guildId}`,
          token,
        ]
      : null,
    fetchWithToken
  )

  return {
    data: data ? data.channels : undefined,
    isLoading: !error && !data,
    error,
  }
}

export const useDiscordGuildTextChannels = (guildId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<GuildChannelResponse>(
    token && guildId
      ? [
          `${configProvider.getApiEndpoint()}/v1/discord/guild-channel?guildId=${guildId}`,
          token,
        ]
      : null,
    fetchWithToken
  )

  return {
    data: data ? data.channels.filter((c) => c.type == 'GuildText') : undefined,
    isLoading: !error && !data,
    error,
  }
}

export const useDiscordGuildVoiceChannels = (guildId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<GuildChannelResponse>(
    token
      ? [
          `${configProvider.getApiEndpoint()}/v1/discord/guild-channel?guildId=${guildId}`,
          token,
        ]
      : null,
    fetchWithToken
  )

  return {
    data: data
      ? data.channels.filter((c) => c.type == 'GuildVoice')
      : undefined,
    isLoading: !error && !data,
    error,
  }
}

export const useAllDiscordGuildChannels = () => {
  const token = useToken()

  const customFetcher = async (key: string, token: string) => {
    const guilds = await fetchWithToken<Guild[]>(
      `${configProvider.getApiEndpoint()}/v1/guild`,
      token
    )
    if (!guilds) throw new Error('Could not get guilds')

    const guildChannels = await Promise.all(
      guilds.map((guild) => {
        return fetchWithToken<GuildChannel[]>(
          `${configProvider.getApiEndpoint()}/v1/discord/guild-channel?guildId=${
            guild.id
          }`,
          token
        )
      })
    )

    return guildChannels.map((guildChannel) => guildChannel || []).flat()
  }

  const { error, data } = useSWR<GuildChannel[]>(
    token
      ? [
          `internal_${configProvider.getApiEndpoint()}_useAllDiscordGuildChannels`,
          token,
        ]
      : null,
    customFetcher
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}

export const useDiscordGuildMembers = (guildId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<GuildMemberResponse>(
    token && guildId
      ? [
          `${configProvider.getApiEndpoint()}/v1/discord/guild-member?guildId=${guildId}`,
          token,
        ]
      : null,
    fetchWithToken
  )

  return {
    data: data ? data.members : undefined,
    isLoading: !error && !data,
    error,
  }
}

export const useDiscordGuildRoles = (guildId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<GuildRoleResponse>(
    token && guildId
      ? [
          `${configProvider.getApiEndpoint()}/v1/discord/guild-role?guildId=${guildId}`,
          token,
        ]
      : null,
    fetchWithToken
  )

  return {
    data: data ? data.roles : undefined,
    isLoading: !error && !data,
    error,
  }
}

export const useAllReactionCollectors = (guildId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<CommandFlowGroup[]>(
    token && guildId
      ? [
          `${configProvider.getApiEndpoint()}/v1/command-flow-group?guildId=${guildId}`,
          token,
        ]
      : null,
    fetchWithToken
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}

export const useReactionCollector = (reactionCollectorId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<CommandFlowGroup>(
    token && reactionCollectorId
      ? [
          `${configProvider.getApiEndpoint()}/v1/command-flow-group/${reactionCollectorId}`,
          token,
        ]
      : null,
    fetchWithToken
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}

// We cannot use React hooks here.
export const createReactionCollector = async (
  token: string,
  data: {
    type: number
    guildId: number
    channelSnowflake: string
    name: string
    description: string
    messageText: string
    reactions: string[]
    commandFlows: unknown[]
  }
) => {
  console.log(data)
  const response = await fetch(
    `${configProvider.getApiEndpoint()}/v1/command-flow-group`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(data),
    }
  )

  const responseJson = await response.json()

  return response.status === 200
}

export const sortChannelsByNameAsc = (a: GuildChannel, b: GuildChannel) => {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
}

export const sortChannelsByNameDesc = (a: GuildChannel, b: GuildChannel) => {
  if (a.name > b.name) return -1
  if (a.name < b.name) return 1
  return 0
}

export const sortMembersByDisplayNameAsc = (a: GuildMember, b: GuildMember) => {
  if (a.displayName > b.displayName) return 1
  if (a.displayName < b.displayName) return -1
  return 0
}

export const sortMembersByDisplayNameDesc = (
  a: GuildMember,
  b: GuildMember
) => {
  if (a.displayName > b.displayName) return -1
  if (a.displayName < b.displayName) return 1
  return 0
}

export const sortRolesByNameAsc = (a: GuildRole, b: GuildRole) => {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
}

export const sortRolesByNameDesc = (a: GuildRole, b: GuildRole) => {
  if (a.name > b.name) return -1
  if (a.name < b.name) return 1
  return 0
}
