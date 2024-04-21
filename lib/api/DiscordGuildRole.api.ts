import useSWR from 'swr'
import { useToken } from '../../hooks/use-token'
import { configProvider } from '../config/Config.provider'
import fetchWithToken from '../fetchWithToken'
import { DiscordGuildRole } from './types/DiscordGuildRole'

export type DiscordGuildRoleResponse = {
  success: boolean
  error: number
  roles: DiscordGuildRole[]
}

export const useAllDiscordGuildRoles = (guildId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<DiscordGuildRoleResponse>(
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
