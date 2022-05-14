import { apiEndpoint } from ".";


// We cannot use React hooks here.
const speak = async (token: string, data: { channelId: string, message: string }) => {
    const response = await fetch(`${apiEndpoint}/v1/mira/speak`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    });

    const responseJson = await response.json();

    return response.status === 200;
}

const exports = {
    speak
}

export default exports;
