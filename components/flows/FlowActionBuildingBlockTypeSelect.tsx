import React from 'react'
import { BuildingBlockType } from './FlowActionGroupInput'

type Props = {
  index: number
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const FlowActionBuildingBlockTypeSelect: React.FC<Props> = ({
  index,
  value,
  setValue,
}) => {
  return (
    <div>
      <label htmlFor={`buildingBlockType${index}`} className="block font-bold">
        Building block:
      </label>
      <div className="flex items-stretch justify-center rounded-md bg-black bg-opacity-30">
        <div className="flex items-center justify-center rounded-l-md bg-black bg-opacity-60">
          <span className="px-4">On</span>
        </div>
        <select
          name={`buildingBlockType${index}`}
          id={`buildingBlockType${index}`}
          className="w-full rounded-r-md border-none bg-transparent"
          value={value}
          onChange={(e) => setValue(parseInt(e.currentTarget.value))}
        >
          <option
            value={BuildingBlockType.NONE}
            className="bg-black bg-opacity-90"
          >
            None
          </option>
          <option
            value={BuildingBlockType.SEND_MESSAGE}
            className="bg-black bg-opacity-90"
          >
            Send message
          </option>
          <option
            value={BuildingBlockType.ADD_ROLE}
            className="bg-black bg-opacity-90"
          >
            Add role
          </option>
          <option
            value={BuildingBlockType.REMOVE_ROLE}
            className="bg-black bg-opacity-90"
          >
            Remove role
          </option>
        </select>
      </div>
      <small className="block">Please select the building block here.</small>
    </div>
  )
}

export default FlowActionBuildingBlockTypeSelect
