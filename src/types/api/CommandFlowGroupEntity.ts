import { CommandFlowEntities } from './CommandFlowEntities';

export type CommandFlowGroupEntity = {
    id: number;
    createdAt: string;
    updatedAt: string;
    guild: number;
    name: string;
    description: string;
    type: number;
    messageId: string;
    channelId: string;
    messageText: string;
    reactions: string;
    commandFlows: CommandFlowEntities;
};
