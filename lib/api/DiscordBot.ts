import { configProvider } from "../config/Config.provider";


// We cannot use React hooks here.
export const loadGuildCommands = async (token: string, id?: number) => {
    const response = await fetch(`${configProvider.getApiEndpoint()}/v1/discord/load-guild-commands`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
            id
        })
    });

    const responseJson = await response.json();
    return response.status === 201;
}
