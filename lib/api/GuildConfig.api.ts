import useSWR from 'swr'
import { useToken } from '../../hooks/use-token'
import { configProvider } from '../config/Config.provider'
import fetchWithToken from '../fetchWithToken'
import { GuildConfig } from './types/GuildConfig'

export class GuildConfigUpdateError extends Error {}

export const useGuildConfig = (id?: number) => {
  const token = useToken()
  const { error, data } = useSWR<GuildConfig>(
    token && id
      ? [`${configProvider.getApiEndpoint()}/v1/guild-config/${id}`, token]
      : null,
    fetchWithToken
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}

export const updateGuildConfig = async ({
  token,
  id,
  data,
}: {
  token: string
  id: number
  data: Partial<GuildConfig>
}) => {
  const response = await fetch(
    `${configProvider.getApiEndpoint()}/v1/guild-config/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify(data),
    }
  )

  if (!response.ok)
    throw new GuildConfigUpdateError(
      `Update failed with message: ${await response.text()}`
    )

  return await response.json()
}
