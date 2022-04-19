import Link from 'next/link';
import React from 'react';
import Discord from '../../lib/api/Discord';

type Props = {
    reactionCollectorId: number;
}

const ReactionCollectorCard: React.FC<Props> = ({ reactionCollectorId }) => {
    const { error, data, isLoading } = Discord.useReactionCollector(reactionCollectorId);

    if (error) return (
        <div className={'bg-gray-700 text-red-500 rounded-md shadow-md p-4 flex flex-col justify-start items-start text-lg'}>
            <p>Error occurred when loading reaction collector with id {reactionCollectorId}</p>
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
        <Link href={`/flows/reaction/${reactionCollectorId}`}>
            <a className={'bg-gray-700 rounded-md shadow-md p-4 flex flex-col justify-start items-start text-lg hover:scale-105 transform transition-all duration-300 cursor-pointer'}>
                <h1 className='font-bold'>{ data?.name }</h1>
                <small className='text-white text-opacity-30'>{ data?.description }</small>
                <small className='text-white text-opacity-30'>Actions: { data?.commandFlows.length }</small>
            </a>
        </Link>

    )
}

export default ReactionCollectorCard;
