import { ApiResponse } from "./api";

const fetchWithToken = <T>(url: string, token: string): Promise<T> => fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}).then(res => {
    if (200 <= res.status && res.status < 300) return res.json();
    throw new Error(res.statusText);
});

export default fetchWithToken;
