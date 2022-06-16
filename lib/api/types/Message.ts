import { GuildChannel } from "./GuildChannel";
import { GuildMember } from "./GuildMember";

export type Message = {
    id: number;

    createdAt: string;
    
    updatedAt: string;

    snowflake: string;

    content: string;

    isRemovedOnDiscord: boolean;

    guildMember: GuildMember;

    guildChannel: GuildChannel;
}