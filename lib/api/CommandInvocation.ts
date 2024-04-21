import useSWR from 'swr'
import { useToken } from '../../hooks/use-token'
import { configProvider } from '../config/Config.provider'
import fetchWithToken from '../fetchWithToken'

export type CommandInvocation = {
  commandName: string
}

export const useAllCommandInvocation = (guildId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<CommandInvocation[]>(
    token && guildId
      ? [
          `${configProvider.getApiEndpoint()}/v1/command-invocation?guildId=${guildId}`,
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
