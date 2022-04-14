const fetchWithToken = (url: string, token: string) => fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}).then(res => res.json());


export default fetchWithToken;
