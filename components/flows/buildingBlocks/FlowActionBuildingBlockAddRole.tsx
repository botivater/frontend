import React, { useEffect, useState } from 'react';
import Discord from '../../../lib/api/Discord';
import { useAppContext } from '../../context/AppContext';
import { FlowActionGroupOptions } from '../FlowActionGroupInput';

type Props = {
    index: number;
    value: FlowActionGroupOptions;
    setValue: React.Dispatch<React.SetStateAction<FlowActionGroupOptions>>;
}

const FlowActionBuildingBlockAddRole: React.FC<Props> = ({ children, index, value, setValue }) => {
    const [roleId, setRoleId] = useState(value.roleId || "");

    const { guildId } = useAppContext();
    const { error: guildRolesError, data: guildRolesData, isLoading: isGuildRolesLoading } = Discord.useDiscordGuildRoles(guildId);

    if (guildRolesError) console.error(guildRolesError);

    useEffect(() => {
        setValue({
            roleId
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roleId, index]);

    useEffect(() => {
        if (!isGuildRolesLoading && guildRolesData && !roleId) {
            setRoleId(guildRolesData[0].id);
        }
    }, [isGuildRolesLoading, guildRolesData, roleId])

    return (
        <div className='col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
                <label htmlFor={`buildingBlockAddRole${index}`} className='block font-bold'>Role:</label>
                <select name={`buildingBlockAddRole${index}`} id={`buildingBlockAddRole${index}`} className='w-full rounded-r-md bg-black bg-opacity-30 border-none' value={roleId} onChange={(e) => setRoleId(e.currentTarget.value)}>
                    {!isGuildRolesLoading && guildRolesData?.sort(Discord.sortRolesByNameAsc).map(guildRole => <option key={guildRole.id} value={guildRole.id} className='bg-black bg-opacity-90'>{guildRole.name}</option>)}
                </select>
                <small className='block'>Please select the role here.</small>
            </div>
        </div>
    )
}

export default FlowActionBuildingBlockAddRole;
