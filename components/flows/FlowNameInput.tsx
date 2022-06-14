import React from 'react';

type Props = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const FlowNameInput: React.FC<Props> = ({ value, setValue }) => {
    return (
        <div>
            <label htmlFor="name" className='block font-bold'>Name:</label>
            <input type="text" name="name" id="name" className='w-full rounded-md bg-black bg-opacity-30 border-none' placeholder='Country selector' value={value} onChange={(e) => setValue(e.currentTarget.value)} />
            <small className='block'>Please enter a name here.</small>
        </div>
    )
}

export default FlowNameInput;
