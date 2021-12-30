import axios from 'axios';

const endpoint = process.env.VUE_APP_API_ENDPOINT;

export default axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
