import { faChartLine, faCubesStacked } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
import InformationCard from '../components/cards/InformationCard'
import { useAppContext } from '../components/context/AppContext'
import AuthContext from '../components/context/AuthContext'
import ErrorComponent from '../components/errorComponent'
import Layout from '../components/layout'
import Loading from '../components/loading'
import { useDiscordGuildChannels, useDiscordGuildMembers } from '../lib/api/Discord'

const Dashboard: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!;
  const { guildId } = useAppContext();

  const { error: allGuildChannelsError, data: allGuildChannelsData, isLoading: allGuildChannelsIsLoading } = useDiscordGuildChannels(guildId);
  const { error: allGuildMembersError, data: allGuildMembersData, isLoading: allGuildMembersIsLoading } = useDiscordGuildMembers(guildId);

  const quickLinks = [
    {
      href: "/statistics",
      text: "Statistics"
    },
    {
      href: "/speak",
      text: "Speak"
    },
    {
      href: "/commands",
      text: "Commands"
    },
    {
      href: "/flows",
      text: "Flows"
    },
    {
      href: "/reports",
      text: "Reports"
    },
    {
      href: "/message",
      text: "Message log"
    },
    {
      href: "/config",
      text: "Configuration"
    },
    {
      href: "/guild-member",
      text: "Guild members"
    },
  ];

  if (allGuildChannelsError) {
    console.error(allGuildChannelsError);
    return <ErrorComponent message={allGuildChannelsError.toString()} />
  }

  if (allGuildMembersError) {
    console.error(allGuildMembersError);
    return <ErrorComponent message={allGuildMembersError.toString()} />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        {user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Dashboard</h1>
              <p className='text-white text-opacity-30'>The quick bits!</p>
            </div>
            <h2 className='text-2xl font-bold'><FontAwesomeIcon icon={faChartLine} />&nbsp;Quick statistics</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InformationCard loading={allGuildChannelsIsLoading} title={"Total channels"} value={!allGuildChannelsIsLoading && allGuildChannelsData?.length} />
              <InformationCard loading={allGuildMembersIsLoading} title={"Total members"} value={!allGuildMembersIsLoading && allGuildMembersData?.length} />
            </div>
            <h2 className='text-2xl font-bold'><FontAwesomeIcon icon={faCubesStacked} />&nbsp;Components</h2>
            <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {quickLinks.map(quickLink =>
                <Link href={quickLink.href} key={quickLink.text}>
                  <a className='bg-blue-600 hover:bg-blue-700 rounded-md shadow-md py-3 px-4 transition-all duration-300'>
                    <h1 className='font-bold text-lg text-center'>{quickLink.text}</h1>
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

export default Dashboard;
