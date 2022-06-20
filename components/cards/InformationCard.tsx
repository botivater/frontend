import classNames from 'classnames';
import React from 'react';


type Props = {
    loading: boolean;
    title?: string;
    value?: any;
    suffix?: string;
    color?: "pink"|"blue"|"green"|"red"|"gray"
}

const InformationCard: React.FC<Props> = ({ loading, title, value, suffix, color }) => {
    if (loading) return (
        <div className='bg-gradient-to-br from-pink-500 to-purple-700 rounded-md shadow-md py-3 px-4 flex flex-row gap-3 justify-between items-center animate-pulse'>
            <span className='h-7 w-full bg-black bg-opacity-20 rounded-md'></span>
            <span className='h-7 w-1/4 bg-black bg-opacity-20 rounded-md'></span>
        </div>
    )

    return (
        <div className={classNames('bg-gradient-to-br rounded-md shadow-md py-3 px-4 flex flex-row justify-between items-center text-lg', {
            'from-pink-500 to-purple-700': !color || color == 'pink',
            'from-purple-500 to-blue-700': color == 'blue',
            'from-lime-500 to-green-700': color == 'green',
            'from-orange-500 to-red-700': color == 'red',
            'from-slate-500 to-gray-700': color == 'gray',
        })}>
            <h1 className='font-bold'>{ title }</h1>
            <p><strong>{ value }</strong>{ suffix ? ` ${suffix}` : "" }</p>
        </div>
    )
}

export default InformationCard;
