import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import { useAppContext } from '../../components/context/AppContext'
import AuthContext from '../../components/context/AuthContext'
import ErrorComponent from '../../components/errorComponent'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { useAllGuildChannels } from '../../lib/api/GuildChannel.api'
import { useAllGuildMembers } from '../../lib/api/GuildMember.api'
import { useAllMessages } from '../../lib/api/Message.api'
import { Message } from '../../lib/api/types/Message'


const MessageLogPage: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!;
  const { guildId } = useAppContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageCount, setMessageCount] = useState<number>(0);

  const { error: allGuildChannelsError, data: allGuildChannels, isLoading: isAllGuildChannelsLoading } = useAllGuildChannels(guildId);
  const { error: allGuildMembersError, data: allGuildMembers, isLoading: isAllGuildMembersLoading } = useAllGuildMembers(guildId);

  const [guildChannelName, setGuildChannelName] = useState<string>("");
  const guildChannel = allGuildChannels?.find(guildChannel => guildChannel.name === guildChannelName);

  const [guildMemberIdentifier, setGuildMemberIdentifier] = useState<string>("");
  const guildMember = allGuildMembers?.find(guildMember => guildMember.identifier === guildMemberIdentifier);

  const [filterRemoved, setFilterRemoved] = useState(0);

  const [resultLimit, setResultLimit] = useState(10);
  const [resultOffset, setResultOffset] = useState(0);
  const [page, setPage] = useState(0);

  const { error: allMessagesError, data: allMessages, isLoading: isAllMessagesLoading } = useAllMessages({
    guildChannelId: guildChannel?.id,
    guildMemberId: guildMember?.id,
    isRemovedOnDiscord: filterRemoved === 0 ? undefined : filterRemoved === 1,
    limit: resultLimit,
    offset: resultOffset
  });

  const sortChannelsByNameAsc = (a: any, b: any) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  }

  const sortMembersByNameAsc = (a: any, b: any) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  }

  const paginateBackwards = () => {
    const newResultOffset = resultOffset - resultLimit;

    if (newResultOffset < 0) {
      setResultOffset(0);
      return;
    }

    setPage(newResultOffset / resultLimit);
  }

  const paginateForwards = () => {
    const newResultOffset = resultOffset + resultLimit;

    if (newResultOffset > messageCount) {
      return;
    }

    setPage(newResultOffset / resultLimit);
  }

  useEffect(() => {
    if (allMessages) {
      setMessages(allMessages[0]);
      setMessageCount(allMessages[1]);

      setPage(Math.floor(allMessages[1] / resultLimit));
    }
  }, [allMessages, resultLimit]);

  useEffect(() => {
    const newResultOffset = resultLimit * page;
    
    if (newResultOffset < 0) {
      setResultOffset(0);
      return;
    }

    if (newResultOffset > messageCount) {
      setPage(Math.floor(messageCount / resultLimit));
      return;
    }

    setResultOffset(newResultOffset);
  }, [page, messageCount, resultLimit]);

  if (allGuildChannelsError) {
    console.error(allGuildChannelsError);
    return <ErrorComponent message={allGuildChannelsError.toString()} />
  }

  if (allGuildMembersError) {
    console.error(allGuildChannelsError);
    return <ErrorComponent message={allGuildChannelsError.toString()} />
  }

  if (allMessagesError) {
    console.error(allMessagesError);
    return <ErrorComponent message={allMessagesError.toString()} />
  }

  if (isLoading || isAllGuildChannelsLoading || isAllGuildMembersLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Message log</title>
        </Head>
        {user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Message log</h1>
              <p className='text-white text-opacity-30'>Previously sent messages.</p>
            </div>
            <h2 className='text-2xl font-bold'>Search</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div>
                <label htmlFor="guildChannelName" className='block font-bold'>Channel:</label>
                <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                  <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                    <span className='px-4'>#</span>
                  </div>
                  <input name="guildChannelName" id="guildChannelName" list='guildChannelList' type="text" className='w-full rounded-r-md bg-transparent border-none' placeholder='welcome' value={guildChannelName} onChange={(e) => setGuildChannelName(e.currentTarget.value)} />
                  <datalist id="guildChannelList">
                    <option value="">Select a channel...</option>
                    {allGuildChannels && allGuildChannels.sort(sortChannelsByNameAsc).filter(c => c.type === "GUILD_TEXT").map(guildChannel => <option value={guildChannel.name} key={guildChannel.id} className='bg-black bg-opacity-90'>{guildChannel.name}</option>)}
                  </datalist>
                </div>
                <small className='block'>Select a text channel here.</small>
              </div>
              <div>
                <label htmlFor="guildMemberIdentifier" className='block font-bold'>Member:</label>
                <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                  <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                    <span className='px-4'>@</span>
                  </div>
                  <input name="guildMemberIdentifier" id="guildMemberIdentifier" list="guildMemberList" type="text" className='w-full rounded-r-md bg-transparent border-none' placeholder='johndoe' value={guildMemberIdentifier} onChange={(e) => setGuildMemberIdentifier(e.currentTarget.value)} />
                  <datalist id='guildMemberList'>
                    <option value="">Select a member...</option>
                    {allGuildMembers && allGuildMembers.sort(sortMembersByNameAsc).map(guildMember => <option value={guildMember.identifier} key={guildMember.id} className='bg-black bg-opacity-90'>{guildMember.name} ({guildMember.identifier})</option>)}
                  </datalist>
                </div>
                <small className='block'>Select a member here.</small>
              </div>
              <div>
                <label htmlFor="filterRemoved" className='block font-bold'>Message filter:</label>
                <select name="filterRemoved" id="filterRemoved" className='w-full bg-black bg-opacity-30 rounded-md border-none' value={filterRemoved} onChange={(e) => { setFilterRemoved(parseInt(e.target.value)) }}>
                  <option value={0} className='bg-black bg-opacity-90'>Show all</option>
                  <option value={1} className='bg-black bg-opacity-90'>Only show deleted</option>
                  <option value={2} className='bg-black bg-opacity-90'>Only show not deleted</option>
                </select>
                <small className='block'>Choose a removed filter here.</small>
              </div>
              <div>
                <label htmlFor="resultLimit" className='block font-bold'>Result limit:</label>
                <select name="resultLimit" id="resultLimit" className='w-full bg-black bg-opacity-30 rounded-md border-none' value={resultLimit} onChange={(e) => { setResultLimit(parseInt(e.target.value)) }}>
                  <option value={10} className='bg-black bg-opacity-90'>10</option>
                  <option value={20} className='bg-black bg-opacity-90'>20</option>
                  <option value={50} className='bg-black bg-opacity-90'>50</option>
                  <option value={100} className='bg-black bg-opacity-90'>100</option>
                </select>
                <small className='block'>Choose a result limit here.</small>
              </div>
            </div>
            {messages.length > 0 &&
              <>
                <p>Showing message <span className='font-bold'>{resultOffset}-{resultOffset + resultLimit}</span> out of <span className='font-bold'>{messageCount}</span>.</p>
                <div className='flex justify-between'>
                  <button className='bg-blue-500 py-2 px-4 rounded hover:bg-blue-600' onClick={() => paginateBackwards()}>Previous</button>
                  <input className='bg-black bg-opacity-30 rounded-md border-none w-12 text-center' placeholder='...' value={page} onChange={(e) => setPage(parseInt(e.currentTarget.value) || 0)} />
                  <button className='bg-blue-500 py-2 px-4 rounded hover:bg-blue-600' onClick={() => paginateForwards()}>Next</button>
                </div>
                <div className='grid grid-cols-1 gap-2'>
                  {!isAllMessagesLoading && messages.map(message =>
                    <div className={'py-2 px-4 rounded bg-gray-900 bg-opacity-30 hover:bg-opacity-50 group'} key={message.snowflake}>
                      <div>
                        <div className='py-1 space-x-1'>
                          <span className='bg-blue-500 px-2 py-1 rounded text-sm'>#{message.guildChannel.name}</span>
                          <span className='bg-blue-500 px-2 py-1 rounded text-sm'>{message.guildMember.identifier}</span>
                          {message.isRemovedOnDiscord && <span className='bg-red-500 px-2 py-1 rounded text-sm'>Deleted</span>}
                        </div>
                        <div>
                          <span className='font-bold'>{message.guildMember.name}</span>
                          <small> sent at <span>{new Date(message.createdAt).toLocaleString('nl-NL', { dateStyle: 'long', timeStyle: 'medium' })}</span></small>
                        </div>

                        <p>{message.content}</p>
                        <div className='hidden group-hover:block pt-2'>
                          <p className='font-bold'>Extra user info:</p>
                          <p>Snowflake: {message.guildMember.snowflake}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex justify-between'>
                  <button className='bg-blue-500 py-2 px-4 rounded hover:bg-blue-600' onClick={() => paginateBackwards()}>Previous</button>
                  <input className='bg-black bg-opacity-30 rounded-md border-none w-12 text-center' placeholder='...' value={page} onChange={(e) => setPage(parseInt(e.currentTarget.value) || 0)} />
                  <button className='bg-blue-500 py-2 px-4 rounded hover:bg-blue-600' onClick={() => paginateForwards()}>Next</button>
                </div>
              </>
            }
          </div>
        }
      </>
    </Layout>
  )
}

export default MessageLogPage;
