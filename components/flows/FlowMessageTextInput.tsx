import React from 'react';

type Props = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const FlowMessageTextInput: React.FC<Props> = ({ children, value, setValue }) => {
    return (
        <div className='col-span-full'>
            <label htmlFor="messageText" className='block font-bold'>Message text:</label>
            <textarea name="messageText" id="messageText" className='w-full rounded-md bg-black bg-opacity-30 border-none' placeholder='A message to explain the options...' value={value} onChange={(e) => setValue(e.currentTarget.value)} rows={10} />
            <small className='block'>Please enter a message text here.</small>
        </div>
    )
}

export default FlowMessageTextInput;
