export type Guild = {
    id: number;
    createdAt: string;
    updatedAt: string;
    snowflake: string;
    name: string;
    guildConfigId?: number;
}