import useSWR from "swr";
import { apiEndpoint, ApiResponse } from ".";
import { useToken } from "../../hooks/use-token";
import fetchWithToken from "../fetchWithToken";

export type CommandInvocation = {
    commandName: string;
    invocations: number;
}

export type CommandInvocationResponse = ApiResponse<CommandInvocation[]>;

export const useCommandUsage = (token: string) => {
    const { error, data } = useSWR<CommandInvocationResponse>([`${apiEndpoint}/command/usage`, token], fetchWithToken);

    return {
        usage: data,
        isLoading: !error && !data,
        error: error || data?.error
    }
}

// Sorting functions
export const sortByInvocationsAsc = (a: CommandInvocation, b: CommandInvocation) => {
    return a.invocations - b.invocations;
}

export const sortByInvocationsDesc = (a: CommandInvocation, b: CommandInvocation) => {
    return b.invocations - a.invocations;
}
const exports = {
    useCommandUsage,
    sortByInvocationsAsc,
    sortByInvocationsDesc
}

export default exports;
