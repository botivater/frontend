import React, { useContext, useEffect, useState } from 'react'
import {
  sortRolesByNameAsc,
  useDiscordGuildRoles,
} from '../../../lib/api/Discord'
import AppContext from '../../context/AppContext'
import { FlowActionGroupOptions, SendMessageTo } from '../FlowActionGroupInput'

type Props = {
  index: number
  value: FlowActionGroupOptions
  setValue: React.Dispatch<React.SetStateAction<FlowActionGroupOptions>>
}

const FlowActionBuildingBlockRemoveRole: React.FC<Props> = ({
  index,
  value,
  setValue,
}) => {
  const [roleId, setRoleId] = useState(value.roleId || '')

  const { guildId } = useContext(AppContext)!
  const {
    error: guildRolesError,
    data: guildRolesData,
    isLoading: isGuildRolesLoading,
  } = useDiscordGuildRoles(guildId)

  if (guildRolesError) console.error(guildRolesError)

  useEffect(() => {
    setValue({
      roleId,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId, index])

  useEffect(() => {
    if (!isGuildRolesLoading && guildRolesData && !roleId) {
      setRoleId(guildRolesData[0].id)
    }
  }, [isGuildRolesLoading, guildRolesData, roleId])

  return (
    <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label
          htmlFor={`buildingBlockRemoveRole${index}`}
          className="block font-bold"
        >
          Role:
        </label>
        <select
          name={`buildingBlockRemoveRole${index}`}
          id={`buildingBlockRemoveRole${index}`}
          className="w-full rounded-r-md border-none bg-black bg-opacity-30"
          value={roleId}
          onChange={(e) => setRoleId(e.currentTarget.value)}
        >
          {!isGuildRolesLoading &&
            guildRolesData?.sort(sortRolesByNameAsc).map((guildRole) => (
              <option
                key={guildRole.id}
                value={guildRole.id}
                className="bg-black bg-opacity-90"
              >
                {guildRole.name}
              </option>
            ))}
        </select>
        <small className="block">Please select the role here.</small>
      </div>
    </div>
  )
}

export default FlowActionBuildingBlockRemoveRole
