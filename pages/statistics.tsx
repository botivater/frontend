import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'


const Dashboard: NextPage = () => {
  const router = useRouter();
  const { user, loading } = useFetchUser({ required: true });

  const [generalStatistics, setGeneralStatistics] = useState([
    {
      title: "Total command usages",
      value: 4331
    },
  ]);

  const [commandStatistics, setCommandStatistics] = useState([
    {
      title: "selfcare",
      value: 535
    },
    {
      title: "stats",
      value: 7
    },
    {
      title: "waardenkjeaan",
      value: 231
    },
    {
      title: "snoepje",
      value: 537
    },
    {
      title: "vindeenvriendje",
      value: 380
    },
    {
      title: "affirmatie",
      value: 249
    },
    {
      title: "waarzegger",
      value: 1864
    },
    {
      title: "dev",
      value: 4
    },
    {
      title: "ping",
      value: 405
    },
    {
      title: "toneindicator",
      value: 9
    },
    {
      title: "verjaardag-instellen",
      value: 52
    },
    {
      title: "report",
      value: 11
    },
    {
      title: "help",
      value: 12
    },
    {
      title: "aaien",
      value: 34
    },
  ]);

  return (
    <Layout user={user} loading={loading}>
      <>
        <Head>
          <title>Statistics</title>
        </Head>
        {loading &&
          <div className='flex items-center justify-center h-full'>
            <h1>Loading...</h1>
          </div>
        }
        {!loading && user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Statistics</h1>
              <p className='text-white text-opacity-30'>Insight into usage of the bot.</p>
            </div>
            <h2 className='text-2xl font-bold'>General</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {generalStatistics.map(generalStatistic =>
                <div className='bg-gradient-to-br from-pink-500 to-purple-700 rounded-md shadow-md p-4 flex flex-row justify-between items-center'>

                  <h1 className='font-bold text-lg'>{generalStatistic.title}</h1>
                  <p><strong>{generalStatistic.value}</strong> times</p>

                </div>
              )}
            </div>
            <h2 className='text-2xl font-bold'>Commands</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {commandStatistics.map(commandStatistic =>
                <div className='bg-gradient-to-br from-pink-500 to-purple-700 rounded-md shadow-md p-4 flex flex-row justify-between items-center'>
                  <h1 className='font-bold text-lg'>/{commandStatistic.title}</h1>
                  <p><strong>{commandStatistic.value}</strong> times</p>
                </div>
              )}
            </div>
          </div>
        }
      </>
    </Layout>
  )
}

export default Dashboard
