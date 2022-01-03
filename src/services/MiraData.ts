/* eslint-disable class-methods-use-this */
import { getAxiosWithToken } from './api';

class MiraData {
  public async speak(channelId: string, message: string) {
    const api = await getAxiosWithToken();
    const response = await api.post('/mira/speak', { channelId, message });
    return response.data.data;
  }
}

export default new MiraData();
