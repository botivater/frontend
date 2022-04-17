import { apiEndpoint } from ".";

// We cannot use React hooks here.
const reloadCommands = async (token: string) => {
    const response = await fetch(`${apiEndpoint}/discord-bot/reload/commands`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const responseJson = await response.json();

    return response.status === 200;
}

const exports = {
    reloadCommands
}

export default exports;
