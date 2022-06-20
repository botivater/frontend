import { useAllGuildChannels } from "../../lib/api/GuildChannel.api";
import { Sorting } from "../../lib/Sorting";
import { useAppContext } from "../context/AppContext";
import ErrorComponent from "../errorComponent";
import Loading from "../loading";

export type WelcomeMessageConfig = {
    channelSnowflake: string;
    format: string;
};

export const WelcomeMessageConfig: React.FC<{ welcomeMessageConfig: WelcomeMessageConfig, setWelcomeMessageConfig: (welcomeMessageConfig: WelcomeMessageConfig) => void }> = ({ welcomeMessageConfig, setWelcomeMessageConfig }) => {
    const { guildId } = useAppContext();

    const { error: allGuildChannelsError, data: allGuildChannels, isLoading: isAllGuildChannelsLoading } = useAllGuildChannels(guildId);

    const setChannelSnowflake = (newValue: string) => {
        const { channelSnowflake, ...config } = welcomeMessageConfig;

        setWelcomeMessageConfig({
            channelSnowflake: newValue,
            ...config
        });
    }

    const setFormat = (newValue: string) => {
        const { format, ...config } = welcomeMessageConfig;

        setWelcomeMessageConfig({
            format: newValue,
            ...config
        });
    }

    if (allGuildChannelsError) {
        console.error(allGuildChannelsError);
        return <ErrorComponent message={allGuildChannelsError.toString()} />
    }

    if (isAllGuildChannelsLoading) {
        return <Loading />;
    }

    return (
        <>
            <div>
                <label htmlFor="channelSnowflake" className='block font-bold'>Welcome message:</label>
                <select name="channelSnowflake" id="channelSnowflake" className='w-full bg-black bg-opacity-30 rounded-md border-none' value={welcomeMessageConfig.channelSnowflake} onChange={(e) => { setChannelSnowflake(e.target.value) }}>
                    <option value="" className='bg-black bg-opacity-90'>Select a channel...</option>
                    {allGuildChannels && allGuildChannels.sort(Sorting.sortGuildChannelsByNameAsc).filter(guildChannel => guildChannel.type === 'GUILD_TEXT').map(guildChannel => <option key={guildChannel.snowflake} value={guildChannel.snowflake} className='bg-black bg-opacity-90'>{guildChannel.name}</option>)}
                </select>
                <small className='block'>Select the welcome channel here.</small>
            </div>
            <div>
                <label htmlFor="format" className='block font-bold'>Format:</label>
                <textarea name="format" id="format" className='w-full bg-black bg-opacity-30 rounded-md border-none' value={welcomeMessageConfig.format} onChange={(e) => { setFormat(e.target.value) }}></textarea>
                <small className='block'>Enter a format here.</small>
            </div>
        </>
    );
}