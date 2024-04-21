import { CommonObject } from './CommonObject'

export type GuildMember = CommonObject & {
  snowflake: string
  name: string
  identifier: string
  birthday: string
  lastInteraction: string
  isActive: boolean
}
