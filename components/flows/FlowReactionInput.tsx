import React from 'react';

type Props = {
    value: string[];
    setValue: React.Dispatch<React.SetStateAction<string[]>>;
}

const FlowReactionInput: React.FC<Props> = ({ children, value, setValue }) => {
    const updateReactionsList = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...value];
        newOptions[index] = event.target.value;
        setValue(newOptions);
    }

    const addReaction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const newOptions = [...value, ""];
        setValue(newOptions);
    }

    const deleteReaction = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const newOptions = [...value];
        newOptions.splice(index, 1);
        setValue(newOptions);
    }

    return (
        <>
            {value.map((option, index) =>
                <div key={index} className='col-span-full'>
                    <label htmlFor={`reaction${index}`} className='block font-bold'>Reaction {index + 1}:</label>
                    <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                        <input type="text" name={`reactionsList`} id={`reaction${index}`} className='w-full rounded-l-md bg-transparent border-none' placeholder='Emoji...' value={option} onChange={(e) => updateReactionsList(index, e)} />
                        <div className='bg-red-600 flex items-center justify-center rounded-r-md'>
                            <button className='px-4 h-full' onClick={(e) => deleteReaction(index, e)}>Delete</button>
                        </div>
                    </div>
                    <small className='block'>Please enter an emoji here.</small>
                </div>
            )}
            <div className='col-span-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                <button className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full' onClick={(e) => addReaction(e)}>Add reaction</button>
            </div>
        </>
    )
}

export default FlowReactionInput;
