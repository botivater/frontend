import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../components/context/AuthContext'
import ErrorComponent from '../../../components/errorComponent'
import FlowActionGroupInput, { BuildingBlockType, FlowActionGroup, OnType } from '../../../components/flows/FlowActionGroupInput'
import FlowDescriptionInput from '../../../components/flows/FlowDescriptionInput'
import FlowMessageTextInput from '../../../components/flows/FlowMessageTextInput'
import FlowNameInput from '../../../components/flows/FlowNameInput'
import FlowReactionInput from '../../../components/flows/FlowReactionInput'
import FlowTextChannelSelect from '../../../components/flows/FlowTextChannelSelect'
import Layout from '../../../components/layout'
import Loading from '../../../components/loading'
import { useReactionCollector } from '../../../lib/api/Discord'


const FlowsReactionPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { isLoading, user } = useContext(AuthContext)!;
    const { error: reactionCollectorError, data: reactionCollectorData, isLoading: isReactionCollectorLoading } = useReactionCollector(parseInt(id as string));

    const [channelId, setChannelId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [messageText, setMessageText] = useState("");
    const [reactionsList, setReactionsList] = useState([""]);
    const [actionGroups, setActionGroups] = useState<FlowActionGroup[]>([]);

    const [submitting, setSubmitting] = useState();

    useEffect(() => {
        if (!isReactionCollectorLoading && reactionCollectorData) {
            setChannelId(reactionCollectorData.channelId);
            setName(reactionCollectorData.name);
            setDescription(reactionCollectorData.description);
            setMessageText(reactionCollectorData.messageText);

            // TODO: Save in database
            // setReactionsList(reactionCollectorData.reactions);

            const processedCommandFlows: FlowActionGroup[] = [];
            reactionCollectorData.commandFlows.forEach(commandFlow => {
                const parsedOpts: any = commandFlow.options;

                processedCommandFlows.push({
                    onType: commandFlow.onType,
                    buildingBlockType: commandFlow.buildingBlockType,
                    options: {
                        toType: parsedOpts.toType || undefined,
                        to: parsedOpts.to || undefined,
                        messageFormat: parsedOpts.messageFormat || undefined,
                        roleId: parsedOpts.roleId || undefined,
                    },
                    checkType: commandFlow.checkType,
                    checkValue: commandFlow.checkValue
                })
            });

            setActionGroups(processedCommandFlows);
        }
    }, [isReactionCollectorLoading, reactionCollectorData]);

    if (reactionCollectorError) {
        console.error(reactionCollectorError);
        return <ErrorComponent message={reactionCollectorError.toString()} />
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Layout>
            <>
                <Head>
                    <title>Editing reaction flow</title>
                </Head>
                {user &&
                    <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
                        <div>
                            <h1 className='text-3xl font-bold'>Flows</h1>
                            <p className='text-white text-opacity-30'>Automate certain actions.</p>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>Reaction flow editor</h2>
                            <p className='text-white text-opacity-30'>Editing reaction flow: {reactionCollectorData?.name}</p>
                        </div>
                        <form className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' onSubmit={(e) => null}>
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

export default FlowsReactionPage;
