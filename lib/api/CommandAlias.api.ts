import useSWR from "swr";
import { useToken } from "../../hooks/use-token";
import { configProvider } from "../config/Config.provider";
import fetchWithToken from "../fetchWithToken";
import { CommandAlias } from "./types/CommandAlias";
import { IdCreatedAtUpdatedAt } from "./types/IdCreatedAtUpdatedAt";

export class CommandAliasCreateError extends Error {};
export class CommandAliasUpdateError extends Error {};
export class CommandAliasDeleteError extends Error {};

export const useAllCommandAliases = (guildId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<CommandAlias[]>(token && guildId ? [`${configProvider.getApiEndpoint()}/v1/command-alias?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

export const useCommandAlias = (id?: number) => {
    const token = useToken();
    const { error, data } = useSWR<CommandAlias>(token && id ? [`${configProvider.getApiEndpoint()}/v1/command-alias/${id}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

export const createCommandAlias = async (token: string, data: Omit<CommandAlias, IdCreatedAtUpdatedAt>): Promise<CommandAlias> => {
    const response = await fetch(`${configProvider.getApiEndpoint()}/v1/command-alias`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new CommandAliasCreateError(`Create failed with message: ${await response.text()}`);

    return await response.json();
}

export const updateCommandAlias = async (token: string, id: number, data: Partial<CommandAlias>): Promise<CommandAlias> => {
    const response = await fetch(`${configProvider.getApiEndpoint()}/v1/command-alias/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'PATCH',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new CommandAliasUpdateError(`Update failed with message: ${await response.text()}`);

    return await response.json();
}

export const deleteCommandAlias = async (token: string, id: number) => {
    const response = await fetch(`${configProvider.getApiEndpoint()}/v1/command-alias/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'DELETE'
    });

    if (!response.ok) throw new CommandAliasDeleteError(`Delete failed with message: ${await response.text()}`);
}
