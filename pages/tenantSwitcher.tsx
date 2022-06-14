import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import AuthContext from '../components/context/AuthContext'
import ErrorComponent from '../components/errorComponent'
import Layout from '../components/layout'
import Loading from '../components/loading'
import { useAllDiscordGuilds } from '../lib/api/Discord'
import { setTenant, useTenant } from '../lib/tenant'

const TenantSwitcherPage: NextPage = () => {
    const { isLoading, user } = useContext(AuthContext)!;
    const router = useRouter();

    const [guildId, setGuildId] = useState<number | undefined>(undefined);

    const { data: tenantGuildId, mutate: mutateTenant } = useTenant();
    const { error: allGuildsError, data: allGuildsData, isLoading: isAllGuildsLoading } = useAllDiscordGuilds();

    useEffect(() => {
        if (tenantGuildId) setGuildId(tenantGuildId);
    }, [tenantGuildId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const guildId = e.currentTarget.value;

        setGuildId(parseInt(guildId));
        setTenant(guildId);
        mutateTenant(guildId);
        
        alert('New tenant has been selected!');
        router.push('/');
    }

    if (allGuildsError) {
        console.error(allGuildsError);
        return <ErrorComponent message={allGuildsError.toString()} />
      }
    
      if (isLoading) {
        return <Loading />
      }

    return (
        <Layout>
            <>
                <Head>
                    <title>Tenant Switcher</title>
                </Head>
                {user &&
                    <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
                        <div>
                            <h1 className='text-3xl font-bold'>Tenant switcher</h1>
                            <p className='text-white text-opacity-30'>Switch between Discord guilds.</p>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                            <div>
                                <label htmlFor="guildId" className='block font-bold'>Guild name:</label>
                                <select name="guildId" id="guildId" className='w-full bg-black bg-opacity-30 rounded-md border-none' value={guildId} onChange={(e) => handleChange(e)} disabled={isAllGuildsLoading}>
                                <option value={""} className='bg-black bg-opacity-90'>None</option>
                                    {!isAllGuildsLoading && allGuildsData?.map(guild => <option value={guild.id} key={guild.id} className='bg-black bg-opacity-90'>{guild.name}</option>)}
                                </select>
                                <small className='block'>Please choose the guild you want to work in here.</small>
                            </div>
                        </div>
                    </div>
                }
            </>
        </Layout>
    )
}

export default TenantSwitcherPage;
