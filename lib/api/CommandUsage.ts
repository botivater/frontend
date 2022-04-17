import useSWR from "swr";
import { apiEndpoint, ApiResponse } from ".";
import { useToken } from "../../hooks/use-token";
import fetchWithToken from "../fetchWithToken";

export type CommandUsage = {
    commandName: string;
    invocations: number;
}

const useCommandUsage = () => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<CommandUsage[]>>(token ? [`${apiEndpoint}/command/usage`, token] : null, fetchWithToken);

    if (data && data.error) {
        return {
            data: undefined,
            isLoading: !error && !data,
            error: data.error
        }
    }

    return {
        data: data?.data,
        isLoading: !error && !data,
        error
    }
}

// Sorting functions
const sortByInvocationsAsc = (a: CommandUsage, b: CommandUsage) => {
    return a.invocations - b.invocations;
}

const sortByInvocationsDesc = (a: CommandUsage, b: CommandUsage) => {
    return b.invocations - a.invocations;
}
const exports = {
    useCommandUsage,
    sortByInvocationsAsc,
    sortByInvocationsDesc
}

export default exports;
