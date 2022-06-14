import React from 'react';

type Props = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const FlowDescriptionInput: React.FC<Props> = ({ value, setValue }) => {
    return (
        <div>
            <label htmlFor="description" className='block font-bold'>Description:</label>
            <input type="text" name="description" id="description" className='w-full rounded-md bg-black bg-opacity-30 border-none' placeholder='The country selector gives a role based on the reaction.' value={value} onChange={(e) => setValue(e.currentTarget.value)} />
            <small className='block'>Please enter a description here.</small>
        </div>
    )
}

export default FlowDescriptionInput;
