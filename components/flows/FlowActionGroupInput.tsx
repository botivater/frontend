import React, { useState } from 'react';
import FlowActionBuildingBlockSendMessage from './buildingBlocks/FlowActionBuildingBlockSendMessage';
import FlowActionBuildingBlockTypeSelect from './FlowActionBuildingBlockTypeSelect';
import FlowActionInput from './FlowActionInput';
import FlowActionOnTypeSelect from './FlowActionOnTypeSelect';


export enum OnType {
    NONE,
    REACTION_ADD,
    REACTION_REMOVE,
}

export enum BuildingBlockType {
    NONE = 0,
    SEND_MESSAGE = 1,
    ADD_ROLE = 2,
    REMOVE_ROLE = 3,
}

export enum CheckType {
    NONE,
    REACTION_EMOJI,
}

export enum SendMessageTo {
    SENDER = 0,
    USER = 1,
    CHANNEL = 2,
}

export type FlowActionGroup = {
    onType: OnType;
    buildingBlockType: BuildingBlockType;
    options: FlowActionGroupOptions;
    order?: number;
    checkType?: CheckType;
    checkValue?: string;
}

export type FlowActionGroupOptions = {
    toType?: number;
    to?: string;
    messageFormat?: string;
    roleId?: string;
}

type Props = {
    value: FlowActionGroup[];
    setValue: React.Dispatch<React.SetStateAction<FlowActionGroup[]>>;
}

const FlowActionGroupInput: React.FC<Props> = ({ children, value, setValue }) => {
    const emptyAction = {
        onType: OnType.NONE,
        buildingBlockType: BuildingBlockType.NONE,
        options: {}
    }

    const updateAction = (index: number, v: FlowActionGroup) => {
        const newOptions = [...value];
        newOptions[index] = v;
        setValue(newOptions);
    }

    const addAction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const newOptions = [...value, emptyAction];
        setValue(newOptions);
    }

    const deleteAction = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const newOptions = [...value];
        newOptions.splice(index, 1);
        setValue(newOptions);
    }

    return (
        <>
            {value.map((flowAction, index) => <FlowActionInput key={index} index={index} value={flowAction} setValue={updateAction} deleteAction={deleteAction} />)}
            <div className='col-span-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                <button className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full' onClick={(e) => addAction(e)}>Add action</button>
            </div>
        </>
    )
}

export default FlowActionGroupInput;
