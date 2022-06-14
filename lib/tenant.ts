import useSWR from "swr";
import getFromLocalStorage from "./getFromLocalStorage";

const TENANT_KEY = 'tenant';

export const useTenant = () => {
    const { error, data, mutate } = useSWR(TENANT_KEY, getFromLocalStorage);

    return {
        data: data ? parseInt(data) : undefined,
        isLoading: !error && !data,
        error,
        mutate
    }
}

export const setTenant = (guildId: string) => {
    localStorage.setItem(TENANT_KEY, guildId);
}