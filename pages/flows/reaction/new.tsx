import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ErrorComponent from '../../../components/errorComponent'
import FlowActionGroupInput, { BuildingBlockType, FlowActionGroup, OnType } from '../../../components/flows/FlowActionGroupInput'
import FlowDescriptionInput from '../../../components/flows/FlowDescriptionInput'
import FlowMessageTextInput from '../../../components/flows/FlowMessageTextInput'
import FlowNameInput from '../../../components/flows/FlowNameInput'
import FlowReactionInput from '../../../components/flows/FlowReactionInput'
import FlowTextChannelSelect from '../../../components/flows/FlowTextChannelSelect'
import Layout from '../../../components/layout'
import Loading from '../../../components/loading'


const FlowsReactionNewPage: NextPage = () => {
    const { isLoading, user } = useAuth0()

    const [channelId, setChannelId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [messageText, setMessageText] = useState("");
    const [reactionsList, setReactionsList] = useState([""]);
    const [actionGroups, setActionGroups] = useState<FlowActionGroup[]>([{
        onType: OnType.REACTION_ADD,
        buildingBlockType: BuildingBlockType.SEND_MESSAGE,
        options: {}
    }]);

    const [submitting, setSubmitting] = useState();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }

    if (isLoading) {
        return <Loading />
    }

    console.log(actionGroups)

    return (
        <Layout>
            <>
                <Head>
                    <title>New reaction flow</title>
                </Head>
                {user &&
                    <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
                        <div>
                            <h1 className='text-3xl font-bold'>Flows</h1>
                            <p className='text-white text-opacity-30'>Automate certain actions.</p>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>Reaction flow editor</h2>
                            <p className='text-white text-opacity-30'>Creating a new reaction flow.</p>
                        </div>
                        <form className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' onSubmit={(e) => handleSubmit(e)}>
                            <FlowTextChannelSelect value={channelId} setValue={setChannelId} />
                            <FlowNameInput value={name} setValue={setName} />
                            <FlowDescriptionInput value={description} setValue={setDescription} />
                            <FlowMessageTextInput value={messageText} setValue={setMessageText} />
                            <FlowReactionInput value={reactionsList} setValue={setReactionsList} />
                            <FlowActionGroupInput value={actionGroups} setValue={setActionGroups} />
                            <div className='col-span-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                                <button className='bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full' type='submit' disabled={submitting}>Create</button>
                            </div>
                        </form>
                    </div>
                }
            </>
        </Layout>
    )
}

export default withAuthenticationRequired(FlowsReactionNewPage);
