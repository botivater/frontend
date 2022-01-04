/* eslint-disable class-methods-use-this */
import { CommandListEntities } from '@/types/api/CommandListEntities';
import { getAxiosWithToken } from './api';

class CommandData {
  public async getAllCommandLists(): Promise<CommandListEntities> {
    const api = await getAxiosWithToken();
    const response = await api.get('/command/lists');
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
}

export default new CommandData();
