import React, { useEffect } from 'react';
import Discord from '../../lib/api/Discord';
import { useAppContext } from '../context/AppContext';

type Props = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const FlowTextChannelSelect: React.FC<Props> = ({ children, value, setValue }) => {
    const { guildId } = useAppContext();
    const { error, data, isLoading } = Discord.useDiscordGuildTextChannels(guildId);

    useEffect(() => {
        if (data && !value) {
            setValue(data[0].id)
        }
    }, [data, value, setValue]);

    return (
        <div>
            <label htmlFor="channelId" className='block font-bold'>Channel name:</label>
            <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                    <span className='px-4'>#</span>
                </div>
                <select name="channelId" id="channelId" className='w-full rounded-r-md bg-transparent border-none' placeholder='welcome' value={value} onChange={(e) => setValue(e.currentTarget.value)} disabled={isLoading}>
                    {!isLoading && data?.sort(Discord.sortChannelsByNameAsc).map(guildChannel => <option value={guildChannel.id} key={guildChannel.id} className='bg-black bg-opacity-90'>{guildChannel.name}</option>)}
                </select>
            </div>
            <small className='block'>Please select a text channel here.</small>
        </div>
    )
}

export default FlowTextChannelSelect;
