/* eslint-disable class-methods-use-this */
import { getAxiosWithToken } from './api';

class DiscordBotData {
  public async reloadCommands(): Promise<boolean> {
    const api = await getAxiosWithToken();
    const response = await api.get('/discord-bot/reload/commands');
    return response.data.statusCode === 200;
  }
}

export default new DiscordBotData();
