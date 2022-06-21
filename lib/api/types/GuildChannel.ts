import { CommonObject } from "./CommonObject";

export type GuildChannel = CommonObject & {
    snowflake: string;
    name: string;
    type: string;
}