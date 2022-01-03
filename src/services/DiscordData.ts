/* eslint-disable class-methods-use-this */
import { getAxiosWithToken } from './api';

export type Guild = {
  id: string;
  name: string;
}

export type Guilds = Guild[];

export type GuildChannel = {
  id: string;
  name: string;
}

export type GuildChannels = GuildChannel[];

export type GuildMember = {
  id: string;
}

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
}

export default new DiscordData();
