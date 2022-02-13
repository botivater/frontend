/* eslint-disable class-methods-use-this */
import { CommandFlowGroupEntities } from '@/types/api/CommandFlowGroupEntities';
import { CommandFlowGroupEntity } from '@/types/api/CommandFlowGroupEntity';
import { getAxiosWithToken } from './api';

export type Guild = {
  id: string;
  name: string;
};

export type Guilds = Guild[];

export type GuildChannel = {
  id: string;
  name: string;
};

export type GuildChannels = GuildChannel[];

export type GuildMember = {
  id: string;
};

export type GuildMembers = GuildMember[];

class DiscordData {
  public async getAllGuilds(): Promise<Guilds> {
    const api = await getAxiosWithToken();
    const response = await api.get('/discord/guilds');
    return response.data.data;
  }

  public async getGuild(id: string): Promise<Guild> {
    const api = await getAxiosWithToken();
    const response = await api.get(`/discord/guilds/${id}`);
    return response.data.data;
  }

  public async getAllGuildChannels(guildId: string): Promise<GuildChannels> {
    const api = await getAxiosWithToken();
    const response = await api.get(`/discord/guilds/${guildId}/channels`);
    return response.data.data;
  }

  public async getAllGuildTextChannels(guildId: string): Promise<GuildChannels> {
    const api = await getAxiosWithToken();
    const response = await api.get(`/discord/guilds/${guildId}/channels?type=text`);
    return response.data.data;
  }

  public async getAllGuildVoiceChannels(guildId: string): Promise<GuildChannels> {
    const api = await getAxiosWithToken();
    const response = await api.get(`/discord/guilds/${guildId}/channels?type=voice`);
    return response.data.data;
  }

  public async getAllGuildMembers(guildId: string): Promise<GuildMembers> {
    const api = await getAxiosWithToken();
    const response = await api.get(`/discord/guilds/${guildId}/members`);
    return response.data.data;
  }

  public async getAllReactionCollectors(): Promise<CommandFlowGroupEntities> {
    const api = await getAxiosWithToken();
    const response = await api.get('/discord/reactionCollectors');
    return response.data.data;
  }

  public async getReactionCollector(reactionCollectorId: number): Promise<CommandFlowGroupEntity> {
    const api = await getAxiosWithToken();
    const response = await api.get(`/discord/reactionCollectors/${reactionCollectorId}`);
    return response.data.data;
  }

  public async createReactionCollector(
    type: number,
    guildId: string,
    channelId: string,
    name: string,
    description: string,
    messageText: string,
    reactions: string[],
  ): Promise<boolean> {
    const api = await getAxiosWithToken();
    const response = await api.post('/discord/reactionCollectors', {
      type,
      guildId,
      channelId,
      name,
      description,
      messageText,
      reactions,
    });
    return response.data.statusCode === 200;
  }
}

export default new DiscordData();
