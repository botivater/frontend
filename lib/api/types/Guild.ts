import { CommonObject } from './CommonObject'

export type Guild = CommonObject & {
  snowflake: string
  name: string
  guildConfigId?: number
}
