import { useContext } from "react";
import { useAllDiscordGuildRoles } from "../../lib/api/DiscordGuildRole.api";
import { Sorting } from "../../lib/Sorting";
import AppContext from "../context/AppContext";
import ErrorComponent from "../errorComponent";
import Loading from "../loading";

export type InactivityCheckConfig = {
    inactiveRoleId: string;
    activeRoleId: string;
    inactiveUserSeconds: number;
};

export const InactivityCheckConfig: React.FC<{ inactivityCheckConfig: InactivityCheckConfig, setInactivityCheckConfig: (inactivityCheckConfig: InactivityCheckConfig) => void }> = ({ inactivityCheckConfig, setInactivityCheckConfig }) => {
    const { guildId } = useContext(AppContext)!;

    const { error: allGuildRolesError, data: allGuildRoles, isLoading: isAllGuildRolesLoading } = useAllDiscordGuildRoles(guildId);

    const setInactiveRoleId = (newValue: string) => {
        const { inactiveRoleId, ...config } = inactivityCheckConfig;

        setInactivityCheckConfig({
            inactiveRoleId: newValue,
            ...config
        });
    }

    const setActiveRoleId = (newValue: string) => {
        const { activeRoleId, ...config } = inactivityCheckConfig;

        setInactivityCheckConfig({
            activeRoleId: newValue,
            ...config
        });
    }

    const setInactiveUserSeconds = (newValue: number) => {
        const { inactiveUserSeconds, ...config } = inactivityCheckConfig;

        setInactivityCheckConfig({
            inactiveUserSeconds: newValue,
            ...config
        });
    }

    if (allGuildRolesError) {
        console.error(allGuildRolesError);
        return <ErrorComponent message={allGuildRolesError.toString()} />
    }

    if (isAllGuildRolesLoading) {
        return <Loading />;
    }

    return (
        <>
            <div>
                <label htmlFor="inactiveRoleId" className='block font-bold'>Inactive role:</label>
                <select name="inactiveRoleId" id="inactiveRoleId" className='w-full bg-black bg-opacity-30 rounded-md border-none' value={inactivityCheckConfig.inactiveRoleId} onChange={(e) => { setInactiveRoleId(e.target.value) }}>
                    <option value="" className='bg-black bg-opacity-90'>Select a role...</option>
                    {allGuildRoles && allGuildRoles.sort(Sorting.sortDiscordGuildRolesByNameAsc).map(guildRole => <option key={guildRole.id} value={guildRole.id} className='bg-black bg-opacity-90'>{guildRole.name}</option>)}
                </select>
                <small className='block'>Select the inactive role.</small>
            </div>
            <div>
                <label htmlFor="activeRoleId" className='block font-bold'>Active role:</label>
                <select name="activeRoleId" id="activeRoleId" className='w-full bg-black bg-opacity-30 rounded-md border-none' value={inactivityCheckConfig.activeRoleId} onChange={(e) => { setActiveRoleId(e.target.value) }}>
                    <option value="" className='bg-black bg-opacity-90'>Select a role...</option>
                    {allGuildRoles && allGuildRoles.sort(Sorting.sortDiscordGuildRolesByNameAsc).map(guildRole => <option key={guildRole.id} value={guildRole.id} className='bg-black bg-opacity-90'>{guildRole.name}</option>)}
                </select>
                <small className='block'>Select the active role.</small>
            </div>
            <div>
                <label htmlFor="inactiveUserSeconds" className='block font-bold'>Format:</label>
                <input name="inactiveUserSeconds" id="inactiveUserSeconds" type={"number"} className='w-full bg-black bg-opacity-30 rounded-md border-none' value={inactivityCheckConfig.inactiveUserSeconds} onChange={(e) => { setInactiveUserSeconds(parseInt(e.target.value)) }} placeholder={"7776000"} />
                <small className='block'>Enter the inactivity timeout in seconds.</small>
            </div>
        </>
    );
}