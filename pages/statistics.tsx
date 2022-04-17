import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import InformationCard from '../components/cards/InformationCard'
import Layout from '../components/layout'
import CommandUsage from '../lib/api/CommandUsage'


const Statistics: NextPage = () => {
  const { isLoading, user } = useAuth0();
  const { error: usageError, data: usageData, isLoading: isUsageLoading } = CommandUsage.useCommandUsage();

  if (usageError) console.error(usageError);

  return (
    <Layout>
      <>
        <Head>
          <title>Statistics</title>
        </Head>
        {isLoading &&
          <div className='flex items-center justify-center h-full'>
            <h1>Loading...</h1>
          </div>
        }
        {!isLoading && user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Statistics</h1>
              <p className='text-white text-opacity-30'>Insight into usage of the bot.</p>
            </div>
            <h2 className='text-2xl font-bold'>General</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
              <InformationCard loading={isUsageLoading || usageError} title={"Total command usages"} value={!isUsageLoading && usageData?.reduce((accumulator, commandStatistic) => accumulator += commandStatistic.invocations, 0)} suffix={"times"} />
            </div>
            <h2 className='text-2xl font-bold'>Commands</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
              {isUsageLoading || usageError &&
              <InformationCard loading={true} />
              }
              {!isUsageLoading && usageData?.sort(CommandUsage.sortByInvocationsDesc).map(commandStatistic =>
                <InformationCard loading={false} title={`/${commandStatistic.commandName}`} value={commandStatistic.invocations} suffix={"times"} key={commandStatistic.commandName} />
              )}
            </div>
          </div>
        }
      </>
    </Layout>
  )
}

export default withAuthenticationRequired(Statistics);
