import useSWR from "swr";
import { apiEndpoint, ApiResponse } from ".";
import { useToken } from "../../hooks/use-token";
import fetchWithToken from "../fetchWithToken";

export type CommandList = {
    id: number;
    name: string;
    description: string;
    options: string[];
}

export const useAllCommandLists = (guildId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<CommandList[]>(token ? [`${apiEndpoint}/v1/command-list?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

export const useCommandList = (id: number) => {
    const token = useToken();
    const { error, data } = useSWR<CommandList>(token ? [`${apiEndpoint}/v1/command-list/${id}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

// We cannot use React hooks here.
export const createCommandList = async (token: string, data: { name: string, description: string, options: string[] }) => {
    const response = await fetch(`${apiEndpoint}/v1/command-list`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    });

    const responseJson = await response.json();

    return response.status === 201;
}

// We cannot use React hooks here.
export const updateCommandList = async (token: string, data: { name: string, description: string, options: string[] }, id: number) => {
    const response = await fetch(`${apiEndpoint}/v1/command-list/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'PATCH',
        body: JSON.stringify(data)
    });

    const responseJson = await response.json();

    return response.status === 200;
}

// We cannot use React hooks here.
export const deleteCommandList = async (token: string, id: number) => {
    const response = await fetch(`${apiEndpoint}/v1/command-list/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'DELETE'
    });

    const responseJson = await response.json();

    return response.status === 200;
}
