import { CommonObject } from "./CommonObject";

export type CommandList = CommonObject & {
    name: string;
    description: string;
    options: string[];
    guildId: number;
}
