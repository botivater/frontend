import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import InformationCard from '../components/cards/InformationCard'
import { useAppContext } from '../components/context/AppContext'
import Layout from '../components/layout'
import Discord from '../lib/api/Discord'

const Dashboard: NextPage = () => {
  const { isLoading, user } = useAuth0()
  const { guildId } = useAppContext();

  const { error: allGuildChannelsError, data: allGuildChannelsData, isLoading: allGuildChannelsIsLoading } = Discord.useDiscordGuildChannels(guildId);
  const { error: allGuildMembersError, data: allGuildMembersData, isLoading: allGuildMembersIsLoading } = Discord.useDiscordGuildMembers(guildId);

  if (allGuildChannelsError) console.error(allGuildChannelsError);
  if (allGuildMembersError) console.error(allGuildMembersError);

  const quickLinks = [
    {
      href: "/tenantSwitcher",
      text: "Tenant switcher"
    },
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
      href: "/dashboard",
      text: "Flows"
    }
  ];

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
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InformationCard loading={allGuildChannelsIsLoading} title={"Total channels"} value={!allGuildChannelsIsLoading && allGuildChannelsData?.length} />
              <InformationCard loading={allGuildMembersIsLoading} title={"Total members"} value={!allGuildMembersIsLoading && allGuildMembersData?.length} />
            </div>
            <h2 className='text-2xl font-bold'>Quick links</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {quickLinks.map(quickLink =>
                <Link href={quickLink.href} key={quickLink.text}>
                  <a className='bg-blue-600 hover:bg-blue-700 rounded-md shadow-md p-4 transition-all duration-300'>
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

export default withAuthenticationRequired(Dashboard);
