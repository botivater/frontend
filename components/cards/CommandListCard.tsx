import Link from 'next/link';
import React from 'react';
import CommandList from "../../lib/api/CommandList";

type Props = {
    commandListId: number;
}

const CommandListCard: React.FC<Props> = ({ commandListId }) => {
    const { error, data, isLoading } = CommandList.useCommandList(commandListId);

    if (error) return (
        <div className={'bg-gray-700 text-red-500 rounded-md shadow-md p-4 flex flex-col justify-start items-start text-lg'}>
            <p>Error occurred when loading command list with id {commandListId}</p>
        </div>
    );
    if (isLoading) return (
        <div className='bg-gray-700 rounded-md shadow-md p-4 flex flex-col gap-3 justify-start items-start animate-pulse'>
            <span className='h-7 w-3/4 bg-black bg-opacity-20 rounded-md'></span>
            <span className='h-7 w-1/2 bg-black bg-opacity-20 rounded-md'></span>
            <span className='h-7 w-1/2 bg-black bg-opacity-20 rounded-md'></span>
        </div>
    );

    return (
        <Link href={`/commands/${commandListId}`}>
            <a className={'bg-gray-700 rounded-md shadow-md p-4 flex flex-col justify-start items-start text-lg hover:scale-105 transform transition-all duration-300 cursor-pointer'}>
                <h1 className='font-bold'>/{data?.name}</h1>
                <small className='text-white text-opacity-30'>{data?.description}</small>
                <small>Total options: <strong>{data?.options.length}</strong></small>
            </a>
        </Link>

    )
}

export default CommandListCard;
