import axios from 'axios';
import auth from '@/auth';

const endpoint = process.env.VUE_APP_API_ENDPOINT;

export const getAxios = axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const getAxiosWithToken = async () => axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${await auth.getTokenSilently()}`,
  },
});
