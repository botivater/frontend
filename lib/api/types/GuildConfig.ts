export type GuildConfig = {
    id: number;
    createdAt: string;
    updatedAt: string;
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