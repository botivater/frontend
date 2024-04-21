import { CommonObject } from './CommonObject'

export type CommandAlias = CommonObject & {
  commandName: string
  internalName: string
}
