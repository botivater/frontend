import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import ErrorComponent from '../../components/errorComponent'
import ReactionCollectorCard from '../../components/cards/ReactionCollectorCard'
import Layout from '../../components/layout'
import { useToken } from '../../hooks/use-token'
import Loading from '../../components/loading'
import AuthContext from '../../components/context/AuthContext'
import { useAllReactionCollectors } from '../../lib/api/Discord'
import AppContext from '../../components/context/AppContext'

const FlowsPage: NextPage = () => {
    const { isLoading, user } = useContext(AuthContext)!;
    const { guildId } = useContext(AppContext)!;
    const token = useToken();

    const { error: allReactionCollectorsError, data: allReactionCollectors, isLoading: isAllReactionCollectorsLoading } = useAllReactionCollectors(guildId);

    if (allReactionCollectorsError) {
        console.error(allReactionCollectorsError);
        return <ErrorComponent message={allReactionCollectorsError.toString()} />
    }

    if (isLoading || isAllReactionCollectorsLoading) {
        return <Loading />
    }

    return (
        <Layout>
            <>
                <Head>
                    <title>Flows</title>
                </Head>
                {user &&
                    <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
                        <div>
                            <h1 className='text-3xl font-bold'>Flows</h1>
                            <p className='text-white text-opacity-30'>Automate certain actions.</p>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>Reaction flows</h2>
                            <p className='text-white text-opacity-30'>Perform actions when an emoji is clicked.</p>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                            <div>
                                <Link href={"/flows/reaction/new"}>
                                    <a className='bg-green-600 hover:bg-green-700 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full block text-center'>Create a new flow</a>
                                </Link>
                                <small className='text-white text-opacity-30 block'>Press this button to create a new reaction flow.</small>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                            {allReactionCollectors && allReactionCollectors?.length === 0 && <p className='col-span-full bg-black bg-opacity-30 p-4 text-center rounded-md'>No reaction flows have been found.</p> }
                            {allReactionCollectors && allReactionCollectors?.length > 0 && allReactionCollectors?.map(reactionCollector => <ReactionCollectorCard reactionCollectorId={reactionCollector.id} key={reactionCollector.id} />)}
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>Message flows</h2>
                            <p className='text-white text-opacity-30'>Perform actions when a message is sent.</p>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                            <p className='col-span-full bg-black bg-opacity-30 p-4 text-center rounded-md'>This feature is not available yet.</p>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>Command flows</h2>
                            <p className='text-white text-opacity-30'>Perform actions when a command is issued.</p>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                            <p className='col-span-full bg-black bg-opacity-30 p-4 text-center rounded-md'>This feature is not available yet.</p>
                        </div>
                    </div>
                }
            </>
        </Layout>
    )
}

export default FlowsPage;
