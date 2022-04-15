export type ApiResponse<T> = {
    status: string;
    statusCode: number;
    data?: T;
    error?: any;
}

export const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
