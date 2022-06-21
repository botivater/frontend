import { CommonObject } from "./CommonObject";

export type GuildConfig = CommonObject & {
    systemChannelId: string;
    announcementChannelId: string | null;
    pronounCheckEnabled: boolean;
    welcomeMessageEnabled: boolean;
    welcomeMessageConfig: {
      channelSnowflake: string;
      format: string;
    } | null;
    inactivityCheckEnabled: boolean;
    inactivityCheckConfig: {
      inactiveRoleId: string;
      activeRoleId: string;
      inactiveUserSeconds: number;
    } | null;
    isOpenAIEnabled: boolean;
}