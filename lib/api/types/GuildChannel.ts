import { CommonObject } from './CommonObject'

export type GuildChannel = CommonObject & {
  guildId: number
  snowflake: string
  name: string
  type: string
}
