import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import InformationCard from '../components/cards/InformationCard'
import Layout from '../components/layout'

const Dashboard: NextPage = () => {
  const { isLoading, user } = useAuth0()

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
    <Layout>
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        {isLoading &&
          <div className='flex items-center justify-center h-full'>
            <h1>Loading...</h1>
          </div>
        }
        {!isLoading && user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Dashboard</h1>
              <p className='text-white text-opacity-30'>The quick bits!</p>
            </div>
            <h2 className='text-2xl font-bold'>Statistics</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {shortStatistics.map(shortStatistic =>
                <InformationCard loading={false} title={shortStatistic.title} value={shortStatistic.value} key={shortStatistic.title} />
              )}
            </div>
            <h2 className='text-2xl font-bold'>Quick links</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {quickLinks.map(quickLink =>
                <Link href={quickLink.href} key={quickLink.text}>
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

export default withAuthenticationRequired(Dashboard);
