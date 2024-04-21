import useSWR from 'swr'
import { useToken } from '../../hooks/use-token'
import { configProvider } from '../config/Config.provider'
import fetchWithToken from '../fetchWithToken'
import { Report } from './types/Report'

export const useAllReports = (guildId?: number) => {
  const token = useToken()
  const { error, data } = useSWR<Report[]>(
    token && guildId
      ? [
          `${configProvider.getApiEndpoint()}/v1/report?guildId=${guildId}`,
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

export const useReport = (id: number) => {
  const token = useToken()
  const { error, data } = useSWR<Report>(
    token && id
      ? [`${configProvider.getApiEndpoint()}/v1/report/${id}`, token]
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
export const updateReport = async (
  token: string,
  data: { resolved: boolean },
  id: number
) => {
  const response = await fetch(
    `${configProvider.getApiEndpoint()}/v1/report/${id}`,
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

  const responseJson = await response.json()

  return response.status === 200
}

export const sortReportsByIdAsc = (a: Report, b: Report) => {
  if (a.id > b.id) return 1
  if (a.id < b.id) return -1
  return 0
}

export const sortReportsByIdDesc = (a: Report, b: Report) => {
  if (a.id > b.id) return -1
  if (a.id < b.id) return 1
  return 0
}
