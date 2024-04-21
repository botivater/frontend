import React, { useContext, useEffect } from 'react'
import {
  sortChannelsByNameAsc,
  useDiscordGuildTextChannels,
} from '../../lib/api/Discord'
import AppContext from '../context/AppContext'

type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const FlowTextChannelSelect: React.FC<Props> = ({ value, setValue }) => {
  const { guildId } = useContext(AppContext)!
  const { error, data, isLoading } = useDiscordGuildTextChannels(guildId)

  useEffect(() => {
    if (data && data.length > 0 && !value) {
      setValue(data[0].id)
    }
  }, [data, value, setValue])

  return (
    <div>
      <label htmlFor="channelId" className="block font-bold">
        Channel name:
      </label>
      <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
        <div className="flex items-center justify-center rounded-l-md bg-black bg-opacity-60">
          <span className="px-4">#</span>
        </div>
        <select
          name="channelId"
          id="channelId"
          className="w-full rounded-r-md border-none bg-transparent"
          placeholder="welcome"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          disabled={isLoading}
        >
          {!isLoading &&
            data?.sort(sortChannelsByNameAsc).map((guildChannel) => (
              <option
                value={guildChannel.id}
                key={guildChannel.id}
                className="bg-black bg-opacity-90"
              >
                {guildChannel.name}
              </option>
            ))}
        </select>
      </div>
      <small className="block">Please select a text channel here.</small>
    </div>
  )
}

export default FlowTextChannelSelect
