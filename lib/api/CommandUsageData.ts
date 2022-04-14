export const CommandInvocationEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/command/usage`;

export type CommandInvocation = {
    commandName: string;
    invocations: number;
}

export type CommandInvocationResponse = {
    status: string;
    statusCode: number;
    data: CommandInvocation[];
}


export const sortByInvocationsAsc = (a: CommandInvocation, b: CommandInvocation) => {
    return a.invocations - b.invocations;
}

export const sortByInvocationsDesc = (a: CommandInvocation, b: CommandInvocation) => {
    return b.invocations - a.invocations;
}
