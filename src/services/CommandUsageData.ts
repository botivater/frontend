/* eslint-disable class-methods-use-this */
import { CommandUsageStatistics } from '@/types/api/CommandUsageStatistics';
import { getAxiosWithToken } from './api';

class CommandUsageData {
  public async getAllUsage(): Promise<CommandUsageStatistics> {
    const api = await getAxiosWithToken();
    const response = await api.get('/command/usage');
    return response.data.data;
  }
}

export default new CommandUsageData();
