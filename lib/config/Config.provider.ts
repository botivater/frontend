class ConfigProvider {
  public getApiEndpoint(): string {
    return process.env.NEXT_PUBLIC_API_ENDPOINT || ''
  }
}

export const configProvider = new ConfigProvider()
