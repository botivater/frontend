import useSWR from "swr";
import { apiEndpoint, ApiResponse } from ".";
import { useToken } from "../../hooks/use-token";
import fetchWithToken from "../fetchWithToken";
import { Report } from "./types/Report";

export const useAllReports = (guildId?: number) => {
    const token = useToken();
    const { error, data } = useSWR<Report[]>(token && guildId ? [`${apiEndpoint}/v1/report?guildId=${guildId}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

const useReport = (id: number) => {
    const token = useToken();
    const { error, data } = useSWR<Report>(token && id ? [`${apiEndpoint}/v1/report/${id}`, token] : null, fetchWithToken);

    return {
        data,
        isLoading: !error && !data,
        error
    }
}

// We cannot use React hooks here.
const updateReport = async (token: string, data: { resolved: boolean }, id: number) => {
    const response = await fetch(`${apiEndpoint}/v1/report/${id}`, {
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

const sortReportsByIdAsc = (a: Report, b: Report) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
}

const sortReportsByIdDesc = (a: Report, b: Report) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
}

const exports = {
    useAllReports,
    useReport,
    updateReport,
    sortReportsByIdAsc,
    sortReportsByIdDesc
}

export default exports;
