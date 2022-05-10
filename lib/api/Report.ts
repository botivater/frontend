import useSWR from "swr";
import { apiEndpoint, ApiResponse } from ".";
import { useToken } from "../../hooks/use-token";
import fetchWithToken from "../fetchWithToken";

export type Report = {
    id: number;
    createdAt: string;
    updatedAt: string;
    
    // Discord Guild Channel Snowflake.
    channelId: string;

    // Description of the report.
    description: string;

    // ID of the user in the database that was reported.
    user: number;

    // Has the report been submitted anonymously?
    anonymous: boolean;

    // Has the report been resolved?
    resolved: boolean;

    // ID of the user in the database that submitted the report.
    guildMember: number;
}

const useAllReports = () => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<Report[]>>(token ? [`${apiEndpoint}/report`, token] : null, fetchWithToken);

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

const useReport = (id: number) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<Report>>(token ? [`${apiEndpoint}/report/${id}`, token] : null, fetchWithToken);

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

// We cannot use React hooks here.
const updateReport = async (token: string, data: { resolved: boolean }, id: number) => {
    const response = await fetch(`${apiEndpoint}/report/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
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
