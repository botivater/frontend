import React from 'react';
import { CheckType } from './FlowActionGroupInput';

type Props = {
    index: number;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

const FlowActionCheckTypeSelect: React.FC<Props> = ({ children, index, value, setValue }) => {
    return (
        <div>
            <label htmlFor={`checkType${index}`} className='block font-bold'>Check type:</label>
            <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                    <span className='px-4'>If</span>
                </div>
                <select name={`checkType${index}`} id={`checkType${index}`} className='w-full rounded-r-md bg-transparent border-none' value={value} onChange={(e) => setValue(parseInt(e.currentTarget.value))}>
                    <option value={CheckType.NONE} className='bg-black bg-opacity-90'>None</option>
                    <option value={CheckType.REACTION_EMOJI} className='bg-black bg-opacity-90'>Reaction emoji</option>
                </select>
            </div>
            <small className='block'>Please select the check type here.</small>
        </div>
    )
}

export default FlowActionCheckTypeSelect;
