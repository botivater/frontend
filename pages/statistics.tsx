import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
import InformationCard from '../components/cards/InformationCard'
import AppContext from '../components/context/AppContext'
import AuthContext from '../components/context/AuthContext'
import ErrorComponent from '../components/errorComponent'
import Layout from '../components/layout'
import Loading from '../components/loading'
import { useAllCommandInvocation } from '../lib/api/CommandInvocation'

type UsageMap = {
  [key: string]: number;
}

const Statistics: NextPage = () => {
  const { isLoading, user } = useContext(AuthContext)!;
  const { guildId } = useContext(AppContext)!;

  const { error: usageError, data: usageData, isLoading: isUsageLoading } = useAllCommandInvocation(guildId);

  const commandInvocations = () => {
    if (!usageData) return [];
    let usageMap: UsageMap = {};

    usageData.forEach((invocation) => {
      usageMap[invocation.commandName] = (usageMap[invocation.commandName] || 0) + 1;
    });

    const usageArray = [];
    for (const command in usageMap) {
      usageArray.push({
        command,
        usage: usageMap[command]
      });
    }

    return usageArray;
  }

  if (usageError) {
    console.error(usageError);
    return <ErrorComponent message={usageError.toString()} />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Statistics</title>
        </Head>
        {user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Statistics</h1>
              <p className='text-white text-opacity-30'>Insight into usage of the bot.</p>
            </div>
            <h2 className='text-2xl font-bold'>General</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
              <InformationCard loading={isUsageLoading || usageError} title={"Total command usages"} value={!isUsageLoading && usageData?.length} suffix={"times"} />
            </div>
            <h2 className='text-2xl font-bold'>Commands</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
              {isUsageLoading || usageError &&
              <InformationCard loading={true} />
              }
              {!isUsageLoading && commandInvocations().sort((a, b) => b.usage - a.usage).map(commandStatistic =>
                <InformationCard loading={false} title={`/${commandStatistic.command}`} value={commandStatistic.usage} suffix={"times"} key={commandStatistic.command} />
              )}
            </div>
          </div>
        }
      </>
    </Layout>
  )
}

export default Statistics;
