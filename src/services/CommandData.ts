/* eslint-disable class-methods-use-this */
import { CommandListEntities } from '@/types/api/CommandListEntities';
import { CommandListEntity } from '@/types/api/CommandListEntity';
import { getAxiosWithToken } from './api';

class CommandData {
  public async getAllCommandLists(): Promise<CommandListEntities> {
    const api = await getAxiosWithToken();
    const response = await api.get('/command/lists');
    return response.data.data;
  }

  public async getCommandList(id: number): Promise<CommandListEntity> {
    const api = await getAxiosWithToken();
    const response = await api.get(`/command/lists/${id}`);
    return response.data.data;
  }

  public async createCommandLists(
    name: string,
    description: string,
    options: string[],
  ): Promise<boolean> {
    const api = await getAxiosWithToken();
    const response = await api.post('/command/lists', {
      name,
      description,
      options,
      guildId: 1,
    });
    return response.data.statusCode === 200;
  }

  public async updateCommandList(
    id: number,
    name: string,
    description: string,
    options: string[],
  ): Promise<boolean> {
    const api = await getAxiosWithToken();
    const response = await api.put(`/command/lists/${id}`, {
      name,
      description,
      options,
    });
    return response.data.statusCode === 200;
  }

  public async deleteCommandList(
    id: number,
  ): Promise<boolean> {
    const api = await getAxiosWithToken();
    const response = await api.delete(`/command/lists/${id}`);
    return response.data.statusCode === 200;
  }
}

export default new CommandData();
