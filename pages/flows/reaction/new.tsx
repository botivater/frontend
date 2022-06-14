import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { useAppContext } from '../../../components/context/AppContext'
import AuthContext from '../../../components/context/AuthContext'
import FlowActionGroupInput, { BuildingBlockType, FlowActionGroup, OnType } from '../../../components/flows/FlowActionGroupInput'
import FlowDescriptionInput from '../../../components/flows/FlowDescriptionInput'
import FlowMessageTextInput from '../../../components/flows/FlowMessageTextInput'
import FlowNameInput from '../../../components/flows/FlowNameInput'
import FlowReactionInput from '../../../components/flows/FlowReactionInput'
import FlowTextChannelSelect from '../../../components/flows/FlowTextChannelSelect'
import Layout from '../../../components/layout'
import Loading from '../../../components/loading'
import { useToken } from '../../../hooks/use-token'
import { createReactionCollector } from '../../../lib/api/Discord'


const FlowsReactionNewPage: NextPage = () => {
    const { isLoading, user } = useContext(AuthContext)!;
    const token = useToken();
    const { guildId } = useAppContext();
    const router = useRouter();

    const [channelSnowflake, setChannelSnowflake] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [messageText, setMessageText] = useState("");
    const [reactionsList, setReactionsList] = useState([""]);
    const [actionGroups, setActionGroups] = useState<FlowActionGroup[]>([{
        onType: OnType.REACTION_ADD,
        buildingBlockType: BuildingBlockType.SEND_MESSAGE,
        options: {},
    }]);

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            const actionGroupsCopy = actionGroups;
            for (let actionGroupIndex = 0; actionGroupIndex < actionGroupsCopy.length; actionGroupIndex++) {
                actionGroupsCopy[actionGroupIndex].order = actionGroupIndex;
            }

            const result = await createReactionCollector(token, {
                type: 1,
                guildId: guildId!,
                channelSnowflake,
                name,
                description,
                messageText,
                reactions: reactionsList,
                commandFlows: actionGroupsCopy
            });

            setSubmitting(false);

            if (result) {
                // router.push("/flows");
            } else {
                alert("An error occurred when submitting the form.");
            }
        } catch (err) {
            setSubmitting(false);
            console.error(err);
        }
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
                            <FlowTextChannelSelect value={channelSnowflake} setValue={setChannelSnowflake} />
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

export default FlowsReactionNewPage;
