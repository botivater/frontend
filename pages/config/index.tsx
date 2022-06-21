import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { InactivityCheckConfig } from '../../components/config/InactivityCheckConfig'
import { WelcomeMessageConfig } from '../../components/config/WelcomeMessageConfig'
import AppContext from '../../components/context/AppContext'
import AuthContext from '../../components/context/AuthContext'
import ErrorComponent from '../../components/errorComponent'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { LoadingOverlay } from '../../components/LoadingOverlay'
import { useToken } from '../../hooks/use-token'
import { useGuild } from '../../lib/api/Guild.api'
import { GuildConfigUpdateError, updateGuildConfig, useGuildConfig } from '../../lib/api/GuildConfig.api'


const ConfigPage: NextPage = () => {
  const { isLoading: isAuthLoading, user } = useContext(AuthContext)!;
  const { guildId } = useContext(AppContext)!;
  const router = useRouter();
  const token = useToken();

  const [isLoading, setLoading] = useState<boolean>(true);

  const [systemChannelId, setSystemChannelId] = useState<string>("");
  const [announcementChannelId, setAnnouncementChannelId] = useState<string | null>(null);
  const [isPronounCheckEnabled, setPronounCheckEnabled] = useState<boolean>(false);
  const [isWelcomeMessageEnabled, setWelcomeMessageEnabled] = useState<boolean>(false);
  const [welcomeMessageConfig, setWelcomeMessageConfig] = useState<{ channelSnowflake: string; format: string; }>({ channelSnowflake: "", format: "" });
  const [isInactivityCheckEnabled, setInactivityCheckEnabled] = useState<boolean>(false);
  const [inactivityCheckConfig, setInactivityCheckConfig] = useState<{ inactiveRoleId: string; activeRoleId: string; inactiveUserSeconds: number; }>({ inactiveRoleId: "", activeRoleId: "", inactiveUserSeconds: 7776000 });
  const [isOpenAIEnabled, setOpenAIEnabled] = useState<boolean>(false);

  const { error: guildError, data: guild, isLoading: isGuildLoading } = useGuild(guildId);
  const { error: guildConfigError, data: guildConfig, isLoading: isGuildConfigLoading } = useGuildConfig(guild?.guildConfigId);

  useEffect(() => {
    if (guildConfig) {
      const {
        systemChannelId,
        announcementChannelId,
        pronounCheckEnabled,
        welcomeMessageEnabled,
        welcomeMessageConfig,
        inactivityCheckEnabled,
        inactivityCheckConfig,
        isOpenAIEnabled
      } = guildConfig;

      setSystemChannelId(systemChannelId);
      setAnnouncementChannelId(announcementChannelId);
      setPronounCheckEnabled(pronounCheckEnabled)
      setWelcomeMessageEnabled(welcomeMessageEnabled);
      setWelcomeMessageConfig(welcomeMessageConfig || { channelSnowflake: "", format: "" });
      setInactivityCheckEnabled(inactivityCheckEnabled);
      setInactivityCheckConfig(inactivityCheckConfig || { inactiveRoleId: "", activeRoleId: "", inactiveUserSeconds: 7776000 });
      setOpenAIEnabled(isOpenAIEnabled);

      setLoading(false);
    }
  }, [guildConfig]);

  const setWelcomeMessageConfigWrapper = useCallback((x: WelcomeMessageConfig) => setWelcomeMessageConfig(x), [setWelcomeMessageConfig]);
  const setInactivityCheckConfigWrapper = useCallback((x: InactivityCheckConfig) => setInactivityCheckConfig(x), [setInactivityCheckConfig]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      systemChannelId,
      announcementChannelId,
      pronounCheckEnabled: isPronounCheckEnabled,
      welcomeMessageEnabled: isWelcomeMessageEnabled,
      welcomeMessageConfig,
      inactivityCheckEnabled: isInactivityCheckEnabled,
      inactivityCheckConfig,
      isOpenAIEnabled
    };

    console.log(formData);

    if (!guild?.guildConfigId) return;

    setLoading(true);

    try {
      const updatedGuildConfig = await updateGuildConfig({
        token,
        id: guild.guildConfigId,
        data: formData
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      await router.push('/dashboard');
    } catch (err) {
      if (err instanceof GuildConfigUpdateError) {
        alert(`${err.name}\n${err.message}`);
      }

      if (err instanceof Error) {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }

  if (guildError) {
    console.error(guildError);
    return <ErrorComponent message={guildError.toString()} />
  }

  if (guildConfigError) {
    console.error(guildConfigError);
    return <ErrorComponent message={guildConfigError.toString()} />
  }

  if (isAuthLoading || isGuildLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Configuration</title>
        </Head>

        {isLoading && <LoadingOverlay />}

        {user &&
          <div className='max-w-6xl mx-auto px-4 flex flex-col gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Config</h1>
              <p className='text-white text-opacity-30'>Configuration and settings.</p>
            </div>
            <form className='grid grid-cols-1 gap-4' onSubmit={handleSubmit}>
              <div>
                <h2 className='text-2xl font-bold'>General</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  <div>
                    <label htmlFor="isPronounCheckEnabled" className='block font-bold'>Pronoun check:</label>
                    <select name="isPronounCheckEnabled" id="isPronounCheckEnabled" className='w-full bg-black bg-opacity-30 rounded-md border-none' value={isPronounCheckEnabled ? 1 : 0} onChange={(e) => { setPronounCheckEnabled(parseInt(e.target.value) === 1 ? true : false) }}>
                      <option value={0} className='bg-black bg-opacity-90'>Disabled</option>
                      <option value={1} className='bg-black bg-opacity-90'>Enabled</option>
                    </select>
                    <small className='block'>Enable or disable pronoun checking.</small>
                  </div>
                  <div>
                    <label htmlFor="isOpenAIEnabled" className='block font-bold'>OpenAI:</label>
                    <select name="isOpenAIEnabled" id="isOpenAIEnabled" className='w-full bg-black bg-opacity-30 rounded-md border-none disabled:opacity-70' value={isOpenAIEnabled ? 1 : 0} onChange={(e) => { setOpenAIEnabled(parseInt(e.target.value) === 1 ? true : false) }} disabled>
                      <option value={0} className='bg-black bg-opacity-90'>Disabled</option>
                      <option value={1} className='bg-black bg-opacity-90'>Enabled</option>
                    </select>
                    <small className='block'>Enable or disable OpenAI.</small>
                  </div>
                </div>
              </div>
              <div>
                <h2 className='text-2xl font-bold'>Inactivity checking</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <div>
                    <label htmlFor="isInactivityCheckEnabled" className='block font-bold'>Inactivity checking:</label>
                    <select name="isInactivityCheckEnabled" id="isInactivityCheckEnabled" className='w-full bg-black bg-opacity-30 rounded-md border-none' value={isInactivityCheckEnabled ? 1 : 0} onChange={(e) => { setInactivityCheckEnabled(parseInt(e.target.value) === 1 ? true : false) }}>
                      <option value={0} className='bg-black bg-opacity-90'>Disabled</option>
                      <option value={1} className='bg-black bg-opacity-90'>Enabled</option>
                    </select>
                    <small className='block'>Enable or disable inactivity checking.</small>
                  </div>
                  <InactivityCheckConfig inactivityCheckConfig={inactivityCheckConfig} setInactivityCheckConfig={setInactivityCheckConfigWrapper} />
                </div>
              </div>
              <div>
                <h2 className='text-2xl font-bold'>Welcome message</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  <div>
                    <label htmlFor="isWelcomeMessageEnabled" className='block font-bold'>Welcome message:</label>
                    <select name="isWelcomeMessageEnabled" id="isWelcomeMessageEnabled" className='w-full bg-black bg-opacity-30 rounded-md border-none' value={isWelcomeMessageEnabled ? 1 : 0} onChange={(e) => { setWelcomeMessageEnabled(parseInt(e.target.value) === 1 ? true : false) }}>
                      <option value={0} className='bg-black bg-opacity-90'>Disabled</option>
                      <option value={1} className='bg-black bg-opacity-90'>Enabled</option>
                    </select>
                    <small className='block'>Enable or disable welcome message.</small>
                  </div>
                  <WelcomeMessageConfig welcomeMessageConfig={welcomeMessageConfig} setWelcomeMessageConfig={setWelcomeMessageConfigWrapper} />
                </div>
              </div>

              <div className='col-span-full flex justify-end'>
                <button type="submit" className='bg-green-600 hover:bg-green-700 rounded-md shadow-md py-2 px-4 transition-all duration-300 w-full md:w-1/3'>Save</button>
              </div>
            </form>
          </div>
        }
      </>
    </Layout>
  )
}

export default ConfigPage;
