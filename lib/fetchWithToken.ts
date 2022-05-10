import { ApiResponse } from "./api";

const fetchWithToken = <T>(url: string, token: string): Promise<ApiResponse<T>> => fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}).then(res => res.json());


export default fetchWithToken;
