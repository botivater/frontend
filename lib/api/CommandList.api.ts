import useSWR from "swr";
import { useToken } from "../../hooks/use-token";
import { configProvider } from "../config/Config.provider";
import fetchWithToken from "../fetchWithToken";
import { CommandList } from "./types/CommandList";
import { IdCreatedAtUpdatedAt } from "./types/IdCreatedAtUpdatedAt";

export class CommandListCreateError extends Error {};
export class CommandListUpdateError extends Error {};
export class CommandListDeleteError extends Error {};

export const useAllCommandLists = (guildId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<CommandList[]>(token && guildId ? [`${configProvider.getApiEndpoint()}/v1/command-list?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

export const useCommandList = (id?: number) => {
    const token = useToken();
    const { error, data } = useSWR<CommandList>(token && id ? [`${configProvider.getApiEndpoint()}/v1/command-list/${id}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

export const createCommandList = async (token: string, data: Omit<CommandList, IdCreatedAtUpdatedAt>): Promise<CommandList> => {
    const response = await fetch(`${configProvider.getApiEndpoint()}/v1/command-list`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new CommandListCreateError(`Create failed with message: ${await response.text()}`);

    return await response.json();
}

export const updateCommandList = async (token: string, id: number, data: Partial<CommandList>): Promise<CommandList> => {
    const response = await fetch(`${configProvider.getApiEndpoint()}/v1/command-list/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'PATCH',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new CommandListUpdateError(`Update failed with message: ${await response.text()}`);

    return await response.json();
}

export const deleteCommandList = async (token: string, id: number) => {
    const response = await fetch(`${configProvider.getApiEndpoint()}/v1/command-list/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'DELETE'
    });

    if (!response.ok) throw new CommandListDeleteError(`Delete failed with message: ${await response.text()}`);
}
