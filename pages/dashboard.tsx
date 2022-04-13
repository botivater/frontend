import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'


const Dashboard: NextPage = () => {
  const router = useRouter();
  const { user, loading } = useFetchUser({ required: true });

  const [shortStatistics, setShortStatistics] = useState([
    {
      title: "Total guilds",
      value: 1
    },
    {
      title: "Total channels",
      value: 164
    },
    {
      title: "Total members",
      value: 174
    }
  ]);

  const [quickLinks, setQuickLinks] = useState([
    {
      href: "/statistics",
      text: "Statistics"
    },
    {
      href: "/dashboard",
      text: "Speak"
    },
    {
      href: "/dashboard",
      text: "Commands"
    },
    {
      href: "/dashboard",
      text: "Flows"
    }
  ]);

  return (
    <Layout user={user} loading={loading}>
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        {loading &&
          <div className='flex items-center justify-center h-full'>
            <h1>Loading...</h1>
          </div>
        }
        {!loading && user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Dashboard</h1>
              <p className='text-white text-opacity-30'>The quick bits!</p>
            </div>
            <h2 className='text-2xl font-bold'>Statistics</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {shortStatistics.map(shortStatistic =>
                <div className='bg-gradient-to-br from-pink-500 to-purple-700 rounded-md shadow-md p-4'>
                  <div className='pb-2'>
                    <h1 className='font-bold text-lg'>{shortStatistic.title}</h1>
                  </div>
                  <div>
                    <p>{shortStatistic.value}</p>
                  </div>
                </div>
              )}
            </div>
            <h2 className='text-2xl font-bold'>Quick links</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {quickLinks.map(quickLink =>
                <Link href={quickLink.href}>
                  <a className='bg-blue-500 hover:bg-blue-700 rounded-md shadow-md p-4 transition-all duration-300'>
                    <h1 className='font-bold text-lg'>{quickLink.text}</h1>
                  </a>
                </Link>
              )}
            </div>
          </div>
        }
      </>
    </Layout>
  )
}

export default Dashboard
