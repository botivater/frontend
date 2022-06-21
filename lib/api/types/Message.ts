import { CommonObject } from "./CommonObject";
import { GuildChannel } from "./GuildChannel";
import { GuildMember } from "./GuildMember";

export type Message = CommonObject & {
    snowflake: string;
    content: string;
    isRemovedOnDiscord: boolean;
    guildMember: GuildMember;
    guildChannel: GuildChannel;
}