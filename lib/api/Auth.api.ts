import { configProvider } from '../config/Config.provider'

type ErrorResponse = {
  statusCode: number
  message: string
}

export type LoginResponse = {
  access_token: string
}

export type MeResponse = {
  userId: number
  email: string
  tenants: {
    id: number
    createdAt: string
    updatedAt: string
    name: string
  }[]
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(
    `${configProvider.getApiEndpoint()}/auth/login`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }
  )

  const responseBody = await response.json()

  if (response.status === 201) {
    return responseBody as LoginResponse
  }

  throw new Error((responseBody as ErrorResponse).message)
}

export const me = async (token?: string): Promise<MeResponse> => {
  const response = await fetch(`${configProvider.getApiEndpoint()}/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const responseBody = await response.json()

  if (response.status === 200) {
    return responseBody as MeResponse
  }

  throw new Error((responseBody as ErrorResponse).message)
}
