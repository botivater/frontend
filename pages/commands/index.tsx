import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CommandListCard from '../../components/cards/CommandListCard'
import InformationCard from '../../components/cards/InformationCard'
import Layout from '../../components/layout'
import CommandList from '../../lib/api/CommandList'

const CommandListsPage: NextPage = () => {
  const { isLoading, user } = useAuth0()

  const { error: allCommandListsError, data: allCommandListsData, isLoading: allCommandListsIsLoading } = CommandList.useAllCommandLists();

  if (allCommandListsError) console.error(allCommandListsError);

  return (
    <Layout>
      <>
        <Head>
          <title>Command lists</title>
        </Head>
        {isLoading &&
          <div className='flex items-center justify-center h-full'>
            <h1>Loading...</h1>
          </div>
        }
        {!isLoading && user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Command lists</h1>
              <p className='text-white text-opacity-30'>Commands that randomly pick an item from a list.</p>
            </div>
            <h2 className='text-2xl font-bold'>General</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
              <div>
                <button className='bg-blue-600 hover:bg-blue-700 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full'>Push changes</button>
                <small className='text-white text-opacity-30 block'>Press this button when you have made changes to the commands.</small>
              </div>
              <div>
                <Link href={"/commands/new"}>
                  <a className='bg-green-600 hover:bg-green-700 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full block text-center'>Create a new command list</a>
                </Link>
                <small className='text-white text-opacity-30 block'>Press this button to create a new command list.</small>
              </div>
            </div>
            <h2 className='text-2xl font-bold'>Command lists</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
              {!allCommandListsIsLoading && allCommandListsData?.map(commandList => <CommandListCard commandListId={commandList.id} key={commandList.id} />)}
            </div>
          </div>
        }
      </>
    </Layout>
  )
}

export default withAuthenticationRequired(CommandListsPage);
