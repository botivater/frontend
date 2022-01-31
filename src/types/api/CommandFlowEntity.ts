export type CommandFlowEntity = {
    id: number;
    createdAt: string;
    updatedAt: string;
    commandFlowGroup: number;
    onType: number;
    buildingBlockType: number;
    checkType?: number;
    checkValue?: string;
    options: string;
    order: number;
};
