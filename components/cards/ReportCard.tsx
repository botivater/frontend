import classNames from 'classnames';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useDiscordGuildChannels } from '../../lib/api/Discord';
import { useReport } from '../../lib/api/Report';
import AppContext from '../context/AppContext';

type Props = {
    reportId: number;
}

const ReportCard: React.FC<Props> = ({ reportId }) => {
    const { guildId } = useContext(AppContext)!;
    const { error, data, isLoading } = useReport(reportId);
    const { error: channelError, data: channelData, isLoading: isChannelLoading } = useDiscordGuildChannels(guildId);

    if (error || channelError) return (
        <div className={'bg-gray-700 text-red-500 rounded-md shadow-md p-4 flex flex-col justify-start items-start text-lg'}>
            <p>Error occurred when loading report with id {reportId}</p>
        </div>
    );

    if (isLoading || isChannelLoading) return (
        <div className='bg-gray-700 rounded-md shadow-md p-4 flex flex-col gap-3 justify-start items-start animate-pulse'>
            <span className='h-7 w-3/4 bg-black bg-opacity-20 rounded-md'></span>
            <span className='h-7 w-1/2 bg-black bg-opacity-20 rounded-md'></span>
            <span className='h-7 w-1/2 bg-black bg-opacity-20 rounded-md'></span>
        </div>
    );

    const channelName = channelData?.find(channel => channel.id === data?.channelId)?.name;

    return (
        <Link href={`/reports/${reportId}`}>
            <a className={classNames('bg-gray-700 rounded-md shadow-md p-4 flex flex-col justify-start items-start text-lg hover:scale-105 transform transition-all duration-300 cursor-pointer', {
                'opacity-40': data?.resolved
            })}>
                <h1 className='font-bold'>Report #{reportId}</h1>
                {data &&
                    <>
                        <small className='text-white text-opacity-30'>Aangemaakt op <strong>{new Date(data.createdAt).toLocaleString("nl-NL", { dateStyle: 'medium', timeStyle: 'short' })}</strong> in het <strong>#{channelName}</strong> kanaal door <strong>{ data.anonymous ? 'anoniem' : `${data.guildMember.name} (${data.guildMember.identifier})` }</strong>.</small>
                        <small className='text-white text-opacity-30'>Deze report is <strong>{data.resolved ? 'afgehandeld' : 'nog niet afgehandeld'}</strong>.</small>
                    </>
                }
            </a>
        </Link>

    )
}

export default ReportCard;
