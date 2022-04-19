import React, { useEffect, useState } from 'react';
import FlowActionBuildingBlockAddRole from './buildingBlocks/FlowActionBuildingBlockAddRole';
import FlowActionBuildingBlockRemoveRole from './buildingBlocks/FlowActionBuildingBlockRemoveRole';
import FlowActionBuildingBlockSendMessage from './buildingBlocks/FlowActionBuildingBlockSendMessage';
import FlowActionBuildingBlockTypeSelect from './FlowActionBuildingBlockTypeSelect';
import FlowActionCheckTypeSelect from './FlowActionCheckTypeSelect';
import FlowActionCheckValueInput from './FlowActionCheckValueInput';
import { BuildingBlockType, CheckType, FlowActionGroup, FlowActionGroupOptions, OnType } from './FlowActionGroupInput';
import FlowActionOnTypeSelect from './FlowActionOnTypeSelect';


type Props = {
    index: number;
    value: FlowActionGroup;
    setValue(index: number, v: FlowActionGroup): void;
    deleteAction(index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const FlowActionInput: React.FC<Props> = ({ children, index, value, setValue, deleteAction }) => {
    const [onType, setOnType] = useState(value.onType || OnType.NONE);
    const [buildingBlockType, setBuildingBlockType] = useState(value.buildingBlockType || BuildingBlockType.NONE);
    const [options, setOptions] = useState<FlowActionGroupOptions>(value.options || {});
    const [checkType, setCheckType] = useState(value.checkType || CheckType.NONE);
    const [checkValue, setCheckValue] = useState(value.checkValue || "");

    useEffect(() => {
        setValue(index, { onType, buildingBlockType, options, checkType, checkValue });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onType, buildingBlockType, options, checkType, checkValue, index]);

    return (
        <div className='bg-black bg-opacity-20 col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-md p-4'>
            <FlowActionOnTypeSelect index={index} value={onType} setValue={setOnType} />
            <FlowActionBuildingBlockTypeSelect index={index} value={buildingBlockType} setValue={setBuildingBlockType} />
            {buildingBlockType === BuildingBlockType.SEND_MESSAGE && <FlowActionBuildingBlockSendMessage index={index} value={options} setValue={setOptions} />}
            {buildingBlockType === BuildingBlockType.ADD_ROLE && <FlowActionBuildingBlockAddRole index={index} value={options} setValue={setOptions} />}
            {buildingBlockType === BuildingBlockType.REMOVE_ROLE && <FlowActionBuildingBlockRemoveRole index={index} value={options} setValue={setOptions} />}
            <FlowActionCheckTypeSelect index={index} value={checkType} setValue={setCheckType} />
            {checkType === CheckType.REACTION_EMOJI && <FlowActionCheckValueInput index={index} value={checkValue} setValue={setCheckValue} />}
            <div className='col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <button className='bg-red-600 rounded-md px-4 py-2' onClick={(e) => deleteAction(index, e)}>Delete</button>
            </div>
        </div>
    )
}

export default FlowActionInput;
