import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useState } from 'react'
import { useAppContext } from '../components/context/AppContext'
import AuthContext from '../components/context/AuthContext'
import ErrorComponent from '../components/errorComponent'
import Layout from '../components/layout'
import Loading from '../components/loading'
import { useToken } from '../hooks/use-token'
import Discord from '../lib/api/Discord'
import { speak } from '../lib/api/Speak'

const SpeakPage: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!;
  const { guildId } = useAppContext();
  const token = useToken();

  const { error: guildChannelsError, data: guildChannelsData, isLoading: isGuildChannelsLoading } = Discord.useDiscordGuildTextChannels(guildId);

  const [channelSnowflake, setChannelSnowflake] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      channelSnowflake,
      message
    };

    setSubmitting(true);

    try {
      const result = await speak(token, data);

      setSubmitting(false);

      if (result) {
        alert("Message has been sent!");
      } else {
        alert("An error occurred when submitting the form.");
      }
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  }

  if (guildChannelsError) {
    console.error(guildChannelsError);
    return <ErrorComponent message={guildChannelsError.toString()} />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Speak</title>
        </Head>
        {user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Speak</h1>
              <p className='text-white text-opacity-30'>Let the Discord Bot send a message!</p>
            </div>
            <form className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label htmlFor="channelId" className='block font-bold'>Channel name:</label>
                <div className='flex items-stretch justify-center bg-black bg-opacity-30 rounded-md'>
                  <div className='bg-black bg-opacity-60 flex items-center justify-center rounded-l-md'>
                    <span className='px-4'>#</span>
                  </div>
                  <select name="channelId" id="channelId" className='w-full rounded-r-md bg-transparent border-none' placeholder='welcome' value={channelSnowflake} onChange={(e) => setChannelSnowflake(e.currentTarget.value)} disabled={isGuildChannelsLoading}>
                    <option value="">Select a channel...</option>
                    {!isGuildChannelsLoading && guildChannelsData?.sort(Discord.sortChannelsByNameAsc).map(guildChannel => <option value={guildChannel.id} key={guildChannel.id} className='bg-black bg-opacity-90'>{guildChannel.name}</option>)}
                  </select>
                </div>
                <small className='block'>Please choose the channel to send a message in here.</small>
              </div>
              <div className='col-span-full'>
                <label htmlFor="message" className='block font-bold'>Message:</label>
                <input type="text" name="message" id="message" className='w-full rounded-md bg-black bg-opacity-30 border-none' placeholder='This is an example message!' value={message} onChange={(e) => setMessage(e.currentTarget.value)} minLength={1} maxLength={2000} />
                <small className='block'>Please enter your message here.</small>
              </div>
              <div>
                <button className='bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full' type='submit' disabled={isSubmitting}>{ isSubmitting ? "Sending message..." : "Send message" }</button>
              </div>
            </form>
          </div>
        }
      </>
    </Layout>
  )
}

export default SpeakPage;
